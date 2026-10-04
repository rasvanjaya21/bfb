import { applyDelay } from '@/libs/apply-delay';
import { contentStatus } from '@/libs/content-status';
import { csvToJson } from '@/libs/csv-parser';
import { facebookSelector } from '@/libs/facebook-selectors';
import { formatDuration } from '@/libs/format-duration';
import { launchBrowser } from '@/libs/launch-browser';
import { logRowOutcome } from '@/libs/log-row-outcome';
import { readCookies } from '@/libs/read-cookies';
import { runBrowserRows, type OpenPage } from '@/libs/run-browser-rows';
import type { AuditLogger } from '@/libs/write-audit-log';
import { type Content } from '@/types/global';
import chalk from 'chalk';
import path from 'path';
import type { CookieData } from 'puppeteer-core';

// How long Facebook gets to enable the Post button, and to close the composer after Post before the row counts as not sent.
const PUBLISH_TIMEOUT_MS = 30000;

// log records the run under the menu's action: the start, one line per content row, and the summary.
async function facebook(log: AuditLogger, action: string): Promise<void> {
	const contents = await csvToJson<Content>(path.join(process.cwd(), 'datas', 'contents.csv'));

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
		const result = await runBrowserRows(browser, contents, postFeed, async (outcome, content) => {
			if (outcome.status === 'failed') {
				outcome = { ...outcome, message: outcome.message?.includes('closed') ? 'Koneksi tertutup' : outcome.message };
				console.log(outcome.message);
				console.log(chalk.red('Gagal memposting konten'));
			}
			await logRowOutcome(log, `NO ${content.NO} UID ${content.COOKIE}`, outcome);
		});

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
async function postFeed(openPage: OpenPage, content: Content): Promise<string | void> {
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

	console.log('Membuka facebook');
	const pageOpener = await page.goto('https://web.facebook.com/login.php?next=https://web.facebook.com/profile', { waitUntil: 'networkidle2' }).catch(() => null);
	if (!pageOpener) throw new Error('Facebook tidak terbuka');
	console.log('Facebook terbuka');

	console.log('Memvalidasi cookie');
	if (page.url().includes('login')) throw new Error('Cookie tidak valid');
	console.log('Cookie valid');

	console.log('Mulai memposting konten');

	console.log('Mencari trigger caption');
	const captionSelector = facebookSelector('captionTrigger');
	const captionTrigger = await page
		.locator(captionSelector)
		.waitHandle()
		.catch(() => null);
	if (!captionTrigger) throw new Error('Trigger caption tidak ditemukan');
	await captionTrigger.click();
	console.log('Trigger caption ditemukan');

	console.log('Menulis caption');
	const createPostSelector = facebookSelector('createPost');
	await page.locator(createPostSelector).wait();
	await page.keyboard.type(content.CAPTION + ' ');
	await page.keyboard.press('Tab');

	console.log('Mencari tombol next');
	const nextPostTrigger = await page
		.locator(facebookSelector('nextPost'))
		.waitHandle()
		.catch(() => null);

	const postPreviewSelector = facebookSelector('postPreview');

	// WITHOUT NEXT CASE
	if (!nextPostTrigger) {
		console.log('Tombol next tidak ditemukan');
		console.log('Memvalidasi publish');

		// Wait until Facebook enables the Post button. The condition lives in the XPath, not in page.evaluate():
		// the obfuscated build rewrites functions sent to the browser and they fail there with ReferenceError.
		const postSelector = facebookSelector('publishPost');
		const postTrigger = await page
			.locator(postSelector)
			.setTimeout(PUBLISH_TIMEOUT_MS)
			.waitHandle()
			.catch(() => null);
		if (!postTrigger) throw new Error('Publish tidak valid');
		await postTrigger.click();
		console.log('Publish valid');
	}

	// WITH NEXT CASE
	if (nextPostTrigger) {
		await nextPostTrigger.click();
		console.log('Tombol next ditemukan');

		console.log('Memvalidasi publish');
		const postPreviewTrigger = await page
			.locator(postPreviewSelector)
			.waitHandle()
			.catch(() => null);
		if (!postPreviewTrigger) throw new Error('Publish tidak valid');
		await postPreviewTrigger.click();
		await page.keyboard.down('Shift');
		await page.keyboard.press('Tab');
		await page.keyboard.up('Shift');
		await page.keyboard.press('Enter');
		console.log('Publish valid');
	}

	// A click is not a sent post: only count it once Facebook has closed the composer.
	console.log('Menunggu postingan terkirim');
	for (const selector of [createPostSelector, postPreviewSelector]) {
		await page.waitForSelector(selector, { hidden: true, timeout: PUBLISH_TIMEOUT_MS }).catch(() => {
			throw new Error('Postingan belum terkirim');
		});
	}

	console.log(chalk.green('Selesai memposting konten'));
}

export { facebook, postFeed };
