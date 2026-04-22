import { applyDelay } from '@/libs/apply-delay';
import { checkDriver } from '@/libs/check-driver';
import { csvToJson } from '@/libs/csv-parser';
import { formatDuration } from '@/libs/format-duration';
import { readCookies } from '@/libs/read-cookies';
import { saveCookies } from '@/libs/save-cookies';
import type { Account } from '@/types/global';
import puppeteerCore, { Browser, type CookieData } from 'puppeteer-core';
import { addExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import readline from 'readline/promises';

const cwd = process.cwd();

async function cookies(readlineInterface: readline.Interface): Promise<void> {
	const accountsPath = `${cwd}/datas/accounts.csv`;
	const accounts = await csvToJson<Account>(accountsPath);

	if (accounts.length === 0) {
		console.clear();
		console.log('Data account(s) kosong\n');
		await applyDelay(1000);
		console.clear();
		return;
	}

	const start = Date.now();

	const puppeteer = addExtra(puppeteerCore);
	puppeteer.use(StealthPlugin());
	const browserPath = await checkDriver();
	const browser: Browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null, executablePath: browserPath!.executablePath });

	for (const account of accounts) await syncCookies(browser, readlineInterface, account);

	const duration = Date.now() - start;

	console.log('===============================');
	console.log(`Estimasi durasi: ${formatDuration(duration)}`);
	console.log('===============================\n');

	process.exit(0);
}

async function syncCookies(browser: Browser, readlineInterface: readline.Interface, account: Account): Promise<void> {
	console.log('===============================');
	console.log(`Data akun nomor ${account.NO}`);

	const page = await browser.newPage();
	const pages = await browser.pages();
	const initialPage = pages[0];
	await initialPage?.close();

	console.log('Menginject cookies');
	const cookiesPath = `${cwd}/credentials/cookies.json`;
	const cookies = await readCookies<CookieData>(cookiesPath, account.UID);
	await browser.setCookie(...cookies);

	console.log('Membuka facebook');
	const pageOpener = await page.goto('https://web.facebook.com/settings/', { waitUntil: 'domcontentloaded' }).catch(() => null);

	if (!pageOpener) {
		console.log('Facebook tidak terbuka');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Facebook terbuka');

	console.log('Mulai menyinkronkan cookie');
	const isInvalidCookies = page.url().includes('next');

	console.log('Mengecek status cookie');
	if (isInvalidCookies) {
		const isCookiesExpired = cookies.length !== 0;
		let loginSelector;

		if (isCookiesExpired) {
			console.log('Cookie sudah kadaluarsa');
			loginSelector = 'text=Continue';
		} else {
			console.log('Cookie tidak ditemukan');
			loginSelector = 'text=Log in to Facebook';
		}

		console.log('Login manual');

		const loginTrigger = page.locator(loginSelector);
		await loginTrigger.click();

		if (isCookiesExpired) {
			const typePasswordSelector = 'text=Forgotten password?';
			await page.locator(typePasswordSelector).wait();
			console.log('Menulis password');
			await page.keyboard.type(account.PASSWORD);
		} else {
			await page.keyboard.press('Tab');

			console.log('Menulis uid');
			await page.keyboard.type(account.UID);
			await page.keyboard.press('Tab');

			console.log('Menulis password');
			await page.keyboard.type(account.PASSWORD);
		}

		await readlineInterface.question('Tekan enter jika sudah login');

		const newCookies = await browser.cookies();
		await saveCookies(cookiesPath, account.UID, newCookies);
		console.log('Menyimpan cookie baru');
	} else {
		console.log('Cookie valid');
	}

	console.log('Selesai menyinkronkan cookie');
	const cookie = await browser.cookies();
	await browser.deleteMatchingCookies(...cookie);
}

export { cookies };
