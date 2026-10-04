import { applyDelay } from '@/libs/apply-delay';
import { askYesNo } from '@/libs/ask-yes-no';
import { contentStatus } from '@/libs/content-status';
import { composerCaptionSelector, facebookSelector, feedCaptionSelector } from '@/libs/facebook-selectors';
import { formatDuration } from '@/libs/format-duration';
import { humanClick } from '@/libs/human-click';
import { humanType } from '@/libs/human-type';
import { launchBrowser } from '@/libs/launch-browser';
import { loadRows } from '@/libs/load-rows';
import { logRowOutcome } from '@/libs/log-row-outcome';
import { randomDelay } from '@/libs/random-delay';
import { readCookies } from '@/libs/read-cookies';
import { runBrowserRows, type OpenPage } from '@/libs/run-browser-rows';
import type { AuditLogger } from '@/libs/write-audit-log';
import { type Content } from '@/types/global';
import chalk from 'chalk';
import path from 'path';
import type { CookieData, Page } from 'puppeteer-core';
import type readline from 'readline/promises';

// How long Facebook gets to enable the Post button, and to close the composer after Post before the row counts as not sent.
const PUBLISH_TIMEOUT_MS = 30000;

// Facebook's mandatory data-consent page.
const CONSENT_PATH = '/privacy/consent/';

// log records the run under the menu's action: the start, one line per content row, and the summary.
// explicit limits the run to the rows with those NO values; a NO that is not in the CSV stops the run before the browser opens.
async function facebook(readlineInterface: readline.Interface, log: AuditLogger, action: string, explicit?: number[]): Promise<void> {
	const contents = await loadRows<Content>(process.cwd(), 'contents.csv', explicit);

	if (contents.length === 0) {
		console.clear();
		console.log('Data content(s) kosong\n');
		await applyDelay(1000);
		console.clear();
		await log(action, 'dilewati', 'Data content(s) kosong');
		return;
	}

	const start = Date.now();
	const browser = await launchBrowser();
	await log(action, 'mulai', `${contents.length} baris`);

	try {
		const result = await runBrowserRows(
			browser,
			contents,
			(openPage, content) => postFeed(openPage, content, readlineInterface, log),
			async (outcome, content) => {
				if (outcome.status === 'failed') {
					outcome = { ...outcome, message: outcome.message?.includes('closed') ? 'Koneksi tertutup' : outcome.message };
					console.log(outcome.message);
					console.log(chalk.red('Gagal memposting konten'));
				}
				await logRowOutcome(log, `NO ${content.NO} UID ${content.COOKIE}`, outcome);
			},
		);

		console.log('===============================');
		console.log(`Berhasil: ${result.done}, dilewati: ${result.skipped}, gagal: ${result.failed}`);
		console.log(`Estimasi durasi: ${formatDuration(Date.now() - start)}`);
		console.log('===============================\n');
		await log(action, result.stopped ? 'dihentikan' : 'selesai', `${result.done} berhasil, ${result.skipped} dilewati, ${result.failed} gagal`);
	} finally {
		await browser.close().catch(() => {});
	}
}

// Returns the reason a content row is skipped, or nothing once it is posted.
// log records the privacy consent the bot gives on the account owner's behalf, one line per account.
async function postFeed(openPage: OpenPage, content: Content, readlineInterface: readline.Interface, log: AuditLogger): Promise<string | void> {
	console.log('===============================');
	console.log(`Data konten nomor ${content.NO}`);

	const status = contentStatus(content);

	console.log('Mengecek rute upload');
	if (status === 'unsupported-route') throw new Error('Rute upload kosong/unsupported');
	console.log(`Rute upload ${content.ROUTE.toLowerCase()}`);

	console.log('Mengecek tipe konten');
	if (status === 'unsupported-type') throw new Error('Tipe konten kosong/unsupported');
	console.log(`Tipe konten ${content.TYPE.toLowerCase()}`);

	if (status === 'in-development') {
		console.log('Masih dalam tahap pengembangan');
		return 'Masih dalam tahap pengembangan';
	}

	console.log('Menginject cookies');
	const cookies = await readCookies<CookieData>(path.join(process.cwd(), 'credentials', 'cookies.json'), content.COOKIE);
	if (cookies.length === 0) throw new Error('Cookie tidak ditemukan');

	const page = await openPage();

	// DEFAULT BFB
	page.setDefaultTimeout(5000);

	// DEFAULT PUPPETEER
	page.setDefaultNavigationTimeout(30000);

	await page.browserContext().setCookie(...cookies);

	const profileUrl = 'https://web.facebook.com/login.php?next=https://web.facebook.com/profile';
	console.log('Membuka facebook');
	const pageOpener = await page.goto(profileUrl, { waitUntil: 'networkidle2' }).catch(() => null);
	if (!pageOpener) throw new Error('Facebook tidak terbuka');
	console.log('Facebook terbuka');

	console.log('Memvalidasi cookie');
	if (page.url().includes('login')) throw new Error('Cookie tidak valid');

	// Facebook can block the account behind a mandatory data-consent page. The operator chose to have the bot agree to it;
	// if that does not get through, they agree in the browser and confirm here.
	if (page.url().includes(CONSENT_PATH)) {
		const reopenProfile = async (): Promise<void> => {
			const reopened = await page.goto(profileUrl, { waitUntil: 'networkidle2' }).catch(() => null);
			if (!reopened) throw new Error('Facebook tidak terbuka');
		};
		console.log('Menyetujui privasi facebook');
		let agreedBy = 'otomatis';
		// Facebook may keep the consent URL for a while after agreeing, so the proof is reopening the profile.
		if (await acceptConsent(page)) await reopenProfile();
		if (page.url().includes(CONSENT_PATH)) {
			agreedBy = 'oleh operator';
			console.log(chalk.yellow('Akun perlu menyetujui privasi facebook di browser'));
			if (!(await askYesNo(readlineInterface, 'Sudah menyetujui privasi? (y/N) '))) {
				console.log('Persetujuan privasi dilewati');
				return 'Persetujuan privasi dilewati';
			}
			await reopenProfile();
			if (page.url().includes(CONSENT_PATH)) throw new Error('Privasi facebook belum disetujui');
		}
		console.log('Privasi facebook disetujui');
		await log(`NO ${content.NO} UID ${content.COOKIE}`, 'disetujui', `Privasi facebook disetujui ${agreedBy}`);
	}
	// A dead session does not always land on a login URL: Facebook can show the public profile (/people/...) with a
	// "See more on Facebook" login dialog instead. The login form is the one thing a signed-in page never has.
	if (await page.$(facebookSelector('loggedOutForm'))) throw new Error('Cookie tidak valid');
	console.log('Cookie valid');

	console.log('Mulai memposting konten');

	await dismissPopup(page, 2000);

	console.log('Mencari trigger caption');
	const captionSelector = facebookSelector('captionTrigger');
	const captionTrigger = await page
		.locator(captionSelector)
		.waitHandle()
		.catch(() => null);
	if (!captionTrigger) throw new Error('Trigger caption tidak ditemukan');
	await humanClick(page, captionTrigger);
	console.log('Trigger caption ditemukan');

	console.log('Menulis caption');
	const createPostSelector = facebookSelector('createPost');
	const composerOpened = await page
		.locator(createPostSelector)
		.wait()
		.then(
			() => true,
			() => false,
		);
	if (!composerOpened) throw new Error('Composer tidak terbuka');
	// Do not trust the composer's autofocus: keystrokes sent before it settles are lost and the caption starts cut short.
	const composerTextbox = await page
		.locator(facebookSelector('composerTextbox'))
		.waitHandle()
		.catch(() => null);
	if (!composerTextbox) throw new Error('Kolom caption tidak ditemukan');
	await humanClick(page, composerTextbox);
	await randomDelay(400, 800);

	// An announcement popup (e.g. "Pembaruan reel") can open while typing and take the keystrokes, leaving the composer
	// empty or cut short. Stop typing as soon as it shows up, close it, and retype once if the caption is not complete.
	const popupShown = async (): Promise<boolean> => (await page.$(facebookSelector('dismissPopup'))) !== null;
	const typedAll = await humanType(page, content.CAPTION + ' ', { interrupt: popupShown });
	await randomDelay(200, 400);
	await dismissPopup(page, 500);
	if (!typedAll || !(await captionInComposer(page, content.CAPTION))) {
		console.log('Caption belum masuk, menulis ulang');
		const textbox = await page
			.locator(facebookSelector('composerTextbox'))
			.waitHandle()
			.catch(() => null);
		if (!textbox) throw new Error('Kolom caption tidak ditemukan');
		await humanClick(page, textbox);
		await clearFocusedField(page);
		await humanType(page, content.CAPTION + ' ');
		await randomDelay(200, 400);
		if (!(await captionInComposer(page, content.CAPTION))) throw new Error('Caption gagal ditulis');
	}
	await page.keyboard.press('Tab');

	console.log('Mencari tombol next');
	const nextPostTrigger = await page
		.locator(facebookSelector('nextPost'))
		.waitHandle()
		.catch(() => null);

	const postPreviewSelector = facebookSelector('postPreview');

	if (nextPostTrigger) {
		await humanClick(page, nextPostTrigger);
		console.log('Tombol next ditemukan');
		await page
			.locator(postPreviewSelector)
			.setTimeout(PUBLISH_TIMEOUT_MS)
			.wait()
			.catch(() => null);
	} else {
		console.log('Tombol next tidak ditemukan');
	}

	// Professional-mode accounts get "Boost post" switched on by default; posting with it on opens the ad flow
	// instead of publishing, so switch it off and make sure it stayed off before clicking Post.
	const boostSelector = facebookSelector('boostPostOn');
	const boostTrigger = await page
		.locator(boostSelector)
		.setTimeout(2000)
		.waitHandle()
		.catch(() => null);
	if (boostTrigger) {
		console.log('Mematikan boost post');
		await humanClick(page, boostTrigger);
		await page.waitForSelector(boostSelector, { hidden: true }).catch(() => {
			throw new Error('Boost post gagal dimatikan');
		});
		await randomDelay(300, 700);
	}

	console.log('Memvalidasi publish');
	const postSelector = facebookSelector('publishPost');
	const postTrigger = await page
		.locator(postSelector)
		.setTimeout(PUBLISH_TIMEOUT_MS)
		.waitHandle()
		.catch(() => null);
	if (!postTrigger) throw new Error('Publish tidak valid');
	await humanClick(page, postTrigger);
	console.log('Publish valid');

	// A click is not a sent post: only count it once Facebook has closed the composer and is back at rest.
	console.log('Menunggu postingan terkirim');
	if (!(await composerClosed(page, [createPostSelector, postPreviewSelector], captionSelector))) {
		// Facebook sometimes publishes but closes the composer late. Before calling the row failed (and inviting a retry
		// that would post twice), look for the caption on the page itself.
		// ponytail: an older post with the same caption also matches; a post id from the network response is the exact check.
		const feedSelector = feedCaptionSelector(content.CAPTION);
		const published = feedSelector
			? await page
					.locator(feedSelector)
					.setTimeout(5000)
					.waitHandle()
					.catch(() => null)
			: null;
		if (!published) throw new Error('Postingan belum terkirim');
		console.log('Postingan terdeteksi di linimasa');
	}

	console.log(chalk.green('Selesai memposting konten'));
}

// Closes a Facebook announcement popup if one shows up within timeoutMs.
async function dismissPopup(page: Page, timeoutMs: number): Promise<void> {
	const button = await page
		.locator(facebookSelector('dismissPopup'))
		.setTimeout(timeoutMs)
		.waitHandle()
		.catch(() => null);
	if (!button) return;
	console.log('Menutup popup facebook');
	await humanClick(page, button);
	await randomDelay(500, 1000);
}

// Consent flow observed on the live page (2026-10-05): four switches, all [Wajib], the last one below the fold of an inner
// scroll panel; "Saya setuju" is aria-disabled until every switch is on; agreeing keeps the consent URL and shows
// "Anda sudah siap!", whose "Tutup" button has to be clicked before Facebook lets the account through.
// Switches clicked while the page is still hydrating can be reset to off, so the bot pauses before the first click and
// goes over the switches again when "Saya setuju" stays disabled. Returns false when it never became clickable.
async function acceptConsent(page: Page): Promise<boolean> {
	let agree = null;
	for (let round = 0; round < 3 && !agree; round++) {
		for (let attempt = 0; attempt < 8; attempt++) {
			const toggle = await page
				.locator(facebookSelector('consentToggleOff'))
				.setTimeout(round === 0 && attempt === 0 ? PUBLISH_TIMEOUT_MS : 2000)
				.waitHandle()
				.catch(() => null);
			if (!toggle) break;
			// The first switch appears before the page has finished hydrating; give it a moment so the click is not reset.
			if (round === 0 && attempt === 0) await randomDelay(1000, 2000);
			await humanClick(page, toggle);
			await randomDelay(400, 900);
		}
		agree = await page
			.locator(facebookSelector('consentAgree'))
			.waitHandle()
			.catch(() => null);
	}
	if (!agree) return false;
	await humanClick(page, agree);
	const done = await page
		.locator(facebookSelector('consentDone'))
		.setTimeout(PUBLISH_TIMEOUT_MS)
		.waitHandle()
		.catch(() => null);
	if (done) {
		await randomDelay(500, 1000);
		await humanClick(page, done);
		// "Tutup" sends the account to the home feed; waiting for that beats waiting for a network that never goes idle.
		const deadline = Date.now() + PUBLISH_TIMEOUT_MS;
		while (page.url().includes(CONSENT_PATH) && Date.now() < deadline) await applyDelay(250);
	}
	return true;
}

// Waits until every composer selector is gone and the caption trigger is visible again.
async function composerClosed(page: Page, composerSelectors: string[], captionSelector: string): Promise<boolean> {
	for (const selector of composerSelectors) {
		const hidden = await page.waitForSelector(selector, { hidden: true, timeout: PUBLISH_TIMEOUT_MS }).then(
			() => true,
			() => false,
		);
		if (!hidden) return false;
	}
	const resting = await page
		.locator(captionSelector)
		.waitHandle()
		.catch(() => null);
	return resting !== null;
}

// Select-all is Cmd+A on macOS and Ctrl+A elsewhere.
async function clearFocusedField(page: Page): Promise<void> {
	const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
	await page.keyboard.down(modifier);
	await page.keyboard.press('KeyA');
	await page.keyboard.up(modifier);
	await page.keyboard.press('Backspace');
}

// A caption whose start cannot be put in an XPath string (it opens with a double quote) is trusted as typed.
async function captionInComposer(page: Page, caption: string): Promise<boolean> {
	const selector = composerCaptionSelector(caption);
	if (!selector) return true;
	const typed = await page
		.locator(selector)
		.setTimeout(2000)
		.waitHandle()
		.catch(() => null);
	return typed !== null;
}

export { facebook, postFeed };
