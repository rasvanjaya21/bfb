import { isFacebookPublishButtonEnable } from '@/ignore';
import { applyDelay } from '@/libs/apply-delay';
import { assetChecker } from '@/libs/asset-checker';
import { checkDriver } from '@/libs/check-driver';
import { csvToJson } from '@/libs/csv-parser';
import { formatDuration } from '@/libs/format-duration';
import { readCookies } from '@/libs/read-cookies';
import { type Content } from '@/types/global';
import puppeteerCore, { Browser, type CookieData } from 'puppeteer-core';
import { addExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const cwd = process.cwd();

export async function facebook(): Promise<void> {
	const contentsPath = `${cwd}/datas/contents.csv`;
	const contents = await csvToJson<Content>(contentsPath);

	if (contents.length === 0) {
		console.clear();
		console.log('Data content(s) kosong\n');
		await applyDelay(1000);
		console.clear();
		return;
	}

	const start = Date.now();

	const puppeteer = addExtra(puppeteerCore);
	puppeteer.use(StealthPlugin());
	const browserPath = await checkDriver();
	const browser: Browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null, executablePath: browserPath!.executablePath });

	for (const content of contents) await postFeed(browser, content);

	const duration = Date.now() - start;

	console.log('===============================');
	console.log(`Estimasi durasi: ${formatDuration(duration)}`);
	console.log('===============================\n');

	process.exit(0);
}

async function postFeed(browser: Browser, content: Content): Promise<void> {
	console.log('===============================');
	console.log(`Data konten nomor ${content.NO}`);

	const page = await browser.newPage();
	const pages = await browser.pages();
	const initialPage = pages[0];
	await initialPage?.close();

	console.log('Menginject cookies');
	const cookiesPath = `${cwd}/credentials/cookies.json`;
	const cookies = await readCookies<CookieData>(cookiesPath, content.COOKIE);
	await browser.setCookie(...cookies);

	console.log('Membuka meta business');
	const pageOpener = await page.goto(`https://business.facebook.com/latest/composer/?asset_id=${content.IDFANSPAGE}&ref=biz_web_home_create_post`, { waitUntil: 'domcontentloaded' }).catch(() => null);

	if (!pageOpener) {
		console.log('Meta business tidak terbuka');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Meta business terbuka');

	console.log('Memvalidasi cookie');
	const isInvalidCookies = page.url().includes('loginpage');

	if (isInvalidCookies) {
		console.log('Cookie tidak valid');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Cookie valid');

	console.log('Mulai memposting konten');

	console.log('Mencari tombol upload');
	const fileSelector = 'text=Add photo/video';
	const [fileTrigger] = await Promise.all([
		page.waitForFileChooser().catch(() => null),
		page
			.locator(fileSelector)
			.click()
			.catch(() => null),
	]);

	if (!fileTrigger) {
		console.log('Tombol upload tidak ditemukan');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Tombol upload ditemukan');

	console.log('Mengupload asset(s)');
	const isValidAsset = await assetChecker(content.PATH);
	if (!isValidAsset) {
		console.log('Asset(s) bermasalah');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	await fileTrigger.accept([content.PATH]);
	console.log('Asset(s) diupload');

	console.log('Menulis caption');
	const captionSelector = 'text=Text';
	const captionTrigger = page.locator(captionSelector);
	await captionTrigger.click();
	await page.keyboard.press('Tab');
	await page.keyboard.type(content.CAPTION);

	console.log('Mencari tombol publish');
	const publishSelector = 'xpath=//div[@role="button" and .//div[text()="Publish"]]';
	const publishTrigger = page.locator(publishSelector);

	if (!publishTrigger) {
		console.log('Tombol publish tidak ditemukan');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Tombol publish ditemukan');

	console.log('Memvalidasi publish');
	const isPublishValid = await isFacebookPublishButtonEnable(page, publishSelector);

	if (!isPublishValid) {
		console.log('Publish tidak valid');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	await publishTrigger.click();
	console.log('Publish valid');

	console.log('Sedang memposting konten');
	const postedSelector = 'text=Your post is published';
	const postedTrigger = await page.locator(postedSelector).waitHandle();
	const isPosted = await postedTrigger.isVisible().catch(() => null);

	if (!isPosted) {
		console.log('Gagal mempublish');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}

	console.log('Selesai memposting konten');
	await browser.deleteMatchingCookies(...cookies);
}

export { postFeed };
