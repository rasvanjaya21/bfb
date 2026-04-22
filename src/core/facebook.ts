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

	let link = '';
	let fileSelector = '';
	let captionSelector = '';

	console.log('Mengecek rute upload');
	if (content.ROUTE === '') {
		console.log('Rute upload kosong');
		return;
	}
	if (content.ROUTE === 'BM') {
		console.log(`Rute upload ${content.ROUTE.toLowerCase()}`);
		link = `https://business.facebook.com/latest/composer/?asset_id=${content.IDFANSPAGE}&ref=biz_web_home_create_post`;
	}
	if (content.ROUTE === 'PERSONAL') {
		console.log(`Rute upload ${content.ROUTE.toLowerCase()}`);
		link = 'https://web.facebook.com/login.php?next=https://web.facebook.com/profile/';
	}

	const page = await browser.newPage();
	const pages = await browser.pages();
	const initialPage = pages[0];
	await initialPage?.close();

	console.log('Menginject cookies');
	const cookiesPath = `${cwd}/credentials/cookies.json`;
	const cookies = await readCookies<CookieData>(cookiesPath, content.COOKIE);
	await browser.setCookie(...cookies);

	console.log('Membuka facebook');
	const pageOpener = await page.goto(link, { waitUntil: 'networkidle2' }).catch(() => null);

	if (!pageOpener) {
		console.log('Facebook tidak terbuka');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Facebook terbuka');

	console.log('Memvalidasi cookie');
	const isInvalidCookies = page.url().includes('login');

	if (isInvalidCookies) {
		console.log('Cookie tidak valid');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	console.log('Cookie valid');

	console.log('Mengecek tipe konten');
	if (content.TYPE === '') {
		console.log('Tipe konten kosong');
		await browser.deleteMatchingCookies(...cookies);
		return;
	}
	if (content.ROUTE === 'BM') {
		console.log(`Tipe konten ${content.TYPE.toLowerCase()}`);
		fileSelector = 'text=Add photo/video';
		captionSelector = 'text=Text';
	}
	if (content.ROUTE === 'PERSONAL') {
		console.log(`Tipe konten ${content.TYPE.toLowerCase()}`);
		fileSelector = 'text=Photo/video';
		captionSelector = `xpath=//div[@role="button" and .//span[text()="What's on your mind?"]]`;
	}

	console.log('Mulai memposting konten');

	if (content.TYPE !== 'POST') {
		console.log('Mencari tombol upload');
		const [fileTrigger] = await Promise.all([
			page.waitForFileChooser().catch(() => null),
			page
				.locator(fileSelector)
				.wait()
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
	}

	const captionTrigger = page.locator(captionSelector);
	await captionTrigger.click();

	console.log('Menulis caption');
	if (content.ROUTE === 'BM') {
		await page.keyboard.press('Tab');
		await page.keyboard.type(content.CAPTION + ' ');
		await page.keyboard.press('Tab');
	} else {
		const createPostSelector = 'text=Add to your post';
		await page.locator(createPostSelector).wait();
		await page.keyboard.type(content.CAPTION + ' ');
		await page.keyboard.press('Tab');
	}

	if (content.ROUTE === 'BM') {
		console.log('Mencari tombol publish');
		const publishSelector = 'xpath=//div[@role="button" and .//div[text()="Publish"]]';
		const publishTrigger = await page
			.locator(publishSelector)
			.waitHandle()
			.catch(() => null);

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

		const postedSelector = 'text=Your post is published';
		await page.locator(postedSelector).wait();
	} else {
		console.log('Mencari tombol next');
		const nextPostSelector = 'text=Next';
		const nextPostTrigger = await page
			.locator(nextPostSelector)
			.waitHandle()
			.catch(() => null);

		if (!nextPostTrigger) {
			console.log('Tombol next tidak ditemukan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}
		await nextPostTrigger.click();
		console.log('Tombol next ditemukan');

		console.log('Memvalidasi publish');
		const postPreviewSelector = 'text=Post preview';
		const postPreviewTrigger = await page
			.locator(postPreviewSelector)
			.waitHandle()
			.catch(() => null);

		if (!postPreviewTrigger) {
			console.log('Publish tidak valid');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}
		await postPreviewTrigger.click();
		await page.keyboard.down('Shift');
		await page.keyboard.press('Tab');
		await page.keyboard.up('Shift');
		await page.keyboard.press('Enter');
		console.log('Publish valid');
	}

	console.log('Selesai memposting konten');
	await browser.deleteMatchingCookies(...cookies);
}

export { postFeed };
