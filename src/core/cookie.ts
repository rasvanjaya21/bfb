import { applyDelay } from '@/libs/apply-delay';
import { askYesNo } from '@/libs/ask-yes-no';
import { ensurePasswordFocus } from '@/libs/ensure-password-focus';
import { facebookSelector } from '@/libs/facebook-selectors';
import { formatDuration } from '@/libs/format-duration';
import { humanClick } from '@/libs/human-click';
import { humanType } from '@/libs/human-type';
import { launchBrowser } from '@/libs/launch-browser';
import { loadRows } from '@/libs/load-rows';
import { logRowOutcome } from '@/libs/log-row-outcome';
import { readCookies } from '@/libs/read-cookies';
import { runBrowserRows, type OpenPage } from '@/libs/run-browser-rows';
import { saveCookies } from '@/libs/save-cookies';
import type { AuditLogger } from '@/libs/write-audit-log';
import type { Account } from '@/types/global';
import chalk from 'chalk';
import path from 'path';
import type { CookieData } from 'puppeteer-core';
import readline from 'readline/promises';

// log records the run under the menu's action: the start, one line per account, and the summary.
// explicit limits the run to the rows with those NO values; a NO that is not in the CSV stops the run before the browser opens.
async function cookies(readlineInterface: readline.Interface, log: AuditLogger, action: string, explicit?: number[]): Promise<void> {
	const accounts = await loadRows<Account>(process.cwd(), 'accounts.csv', explicit);

	if (accounts.length === 0) {
		console.clear();
		console.log('Data account(s) kosong\n');
		await applyDelay(1000);
		console.clear();
		await log(action, 'dilewati', 'Data account(s) kosong');
		return;
	}

	const start = Date.now();
	const browser = await launchBrowser();
	await log(action, 'mulai', `${accounts.length} baris`);

	try {
		const result = await runBrowserRows(
			browser,
			accounts,
			(openPage, account) => syncCookies(openPage, readlineInterface, account),
			async (outcome, account) => {
				if (outcome.status === 'failed') {
					outcome = { ...outcome, message: outcome.message?.includes('closed') ? 'Koneksi tertutup' : outcome.message };
					console.log(outcome.message);
					console.log(chalk.red('Gagal menyinkronkan cookie'));
				}
				await logRowOutcome(log, `NO ${account.NO} UID ${account.UID}`, outcome);
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

// Returns the reason an account is skipped, or nothing once its cookies are in sync.
async function syncCookies(openPage: OpenPage, readlineInterface: readline.Interface, account: Account): Promise<string | void> {
	console.log('===============================');
	console.log(`Data akun nomor ${account.NO}`);

	console.log('Menginject cookies');
	const cookiesPath = path.join(process.cwd(), 'credentials', 'cookies.json');
	const cookies = await readCookies<CookieData>(cookiesPath, account.UID);

	const page = await openPage();
	const context = page.browserContext();
	await context.setCookie(...cookies);

	console.log('Membuka facebook');
	const pageOpener = await page.goto('https://web.facebook.com/settings/', { waitUntil: 'domcontentloaded' }).catch(() => null);
	if (!pageOpener) throw new Error('Facebook tidak terbuka');
	console.log('Facebook terbuka');

	console.log('Mulai menyinkronkan cookie');
	const isInvalidCookies = page.url().includes('next');

	console.log('Mengecek status cookie');
	if (isInvalidCookies) {
		let isCookiesExpired = cookies.length !== 0;
		let loginSelector;

		if (isCookiesExpired) {
			console.log('Cookie sudah kadaluarsa');
			loginSelector = facebookSelector('loginContinue');
		} else {
			console.log('Cookie tidak ditemukan');
			loginSelector = facebookSelector('loginFresh');
		}

		console.log('Login manual');

		const loginTrigger = await page
			.locator(loginSelector)
			.waitHandle()
			.catch(() => null);

		const loginProblem = !loginTrigger;
		if (!loginTrigger) {
			isCookiesExpired = false;
			console.log('Login bermasalah');
		} else {
			await humanClick(page, loginTrigger);
		}

		if (isCookiesExpired) {
			const typePasswordSelector = facebookSelector('forgottenPassword');
			const passVisible = await page
				.locator(typePasswordSelector)
				.setTimeout(3000)
				.waitHandle()
				.catch(() => null);

			if (!passVisible) {
				const retryTrigger = await page
					.locator(loginSelector)
					.waitHandle()
					.catch(() => null);
				if (retryTrigger) await humanClick(page, retryTrigger);
			}

			await page.locator(typePasswordSelector).wait();
			const passwordInput = await page
				.locator('input[type="password"]')
				.waitHandle()
				.catch(() => null);
			if (passwordInput) await humanClick(page, passwordInput);
			await ensurePasswordFocus(page);
			await humanType(page, account.PASSWORD);
		} else {
			await page.keyboard.press('Tab');
			await humanType(page, account.UID);
			const passwordInput = await page
				.locator('input[type="password"]')
				.waitHandle()
				.catch(() => null);
			if (passwordInput) {
				await humanClick(page, passwordInput);
			} else {
				await page.keyboard.press('Tab');
			}
			await ensurePasswordFocus(page);
			await humanType(page, account.PASSWORD);
		}

		if (!(await askYesNo(readlineInterface, 'Simpan cookie? (y/N) '))) {
			console.log('Cookie tidak di simpan');
			return 'Cookie tidak di simpan';
		}
		await saveCookies(cookiesPath, account.UID, await context.cookies());
		console.log('Menyimpan cookie baru');
		if (loginProblem) return 'Login bermasalah';
	} else {
		console.log('Cookie valid');
	}

	console.log(chalk.green('Selesai menyinkronkan cookie'));
}

export { cookies };
