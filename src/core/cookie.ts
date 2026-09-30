import { applyDelay } from '@/libs/apply-delay';
import { csvToJson } from '@/libs/csv-parser';
import { ensurePasswordFocus } from '@/libs/ensure-password-focus';
import { formatDuration } from '@/libs/format-duration';
import { launchBrowser } from '@/libs/launch-browser';
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
async function cookies(readlineInterface: readline.Interface, log: AuditLogger, action: string): Promise<void> {
	const accounts = await csvToJson<Account>(path.join(process.cwd(), 'datas', 'accounts.csv'));

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
			loginSelector = 'text=Continue';
		} else {
			console.log('Cookie tidak ditemukan');
			loginSelector = 'text=Log in to Facebook';
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
			await loginTrigger.click();
		}

		if (isCookiesExpired) {
			const typePasswordSelector = 'text=Forgotten password?';
			await page.locator(typePasswordSelector).wait();
			await ensurePasswordFocus(page);
			await page.keyboard.type(account.PASSWORD);
		} else {
			await page.keyboard.press('Tab');
			await page.keyboard.type(account.UID);
			await page.keyboard.press('Tab');
			await ensurePasswordFocus(page);
			await page.keyboard.type(account.PASSWORD);
		}

		const answer = await readlineInterface.question('Simpan cookie? (y/N) ');

		if (answer.trim().toLowerCase() !== 'y') {
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
