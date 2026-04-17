import { isFacebookPublishButtonEnable } from '@/ignore';
import { applyDelay } from '@/libs/apply-delay';
import { checkDriver } from '@/libs/check-driver';
import { csvToJson } from '@/libs/csv-parser';
import { formatDuration } from '@/libs/format-duration';
import { readCookies } from '@/libs/read-cookies';
import { type Data } from '@/types/global';
import { Browser, type CookieData, launch } from 'puppeteer-core';

export async function facebook(): Promise<void> {
	const cwd = process.cwd();

	const browserPath = await checkDriver();

	const datasPath = `${cwd}/accounts/datas.csv`;
	const cookiesPath = `${cwd}/credentials/cookies.json`;

	const cookies = await readCookies<CookieData>(cookiesPath);

	if (cookies.length === 0) {
		await applyDelay(1000);
		console.clear();
		console.log('Gagal, cookies tidak valid');
		await applyDelay(1000);
		console.clear();
		process.exit(1);
	}

	const datas = await csvToJson<Data>(datasPath);

	if (datas.length === 0) {
		await applyDelay(1000);
		console.clear();
		console.log('Gagal, data(s) tidak valid');
		await applyDelay(1000);
		console.clear();
		process.exit(1);
	}

	console.log('Menjalankan browser');
	const browser = await launch({ headless: false, args: ['--start-maximized'], defaultViewport: null, executablePath: browserPath!.executablePath });

	console.log('Menginject cookies');
	await browser.setCookie(...cookies);

	console.log('Mengakses facebook\n');
	const start = Date.now();

	for (const item of datas) await postFeed(browser, item);

	const duration = Date.now() - start;

	console.log('===============================\n');
	console.log('Postingan(s) berhasil di upload');
	console.log(`Estimasi durasi: ${formatDuration(duration)}`);

	await browser.close();
	process.exit(1);
}

async function postFeed(browser: Browser, data: Data): Promise<void> {
	const cwd = process.cwd();
	const page = await browser.newPage();
	const pages = await browser.pages();

	console.log('===============================');
	console.log('Membuka meta business');
	await page.goto(`https://business.facebook.com/latest/composer/?asset_id=${data.IDFANSPAGE}&ref=biz_web_home_create_post`, { waitUntil: 'domcontentloaded' });
	const initialPage = pages[0];
	await initialPage?.close();

	console.log(`Membuat postingan nomor ${data.NO}`);

	const loginTextSelector = 'xpath=//*[contains(text(), "Log in with a managed Meta account")]';
	const isInvalidCookies = await page.waitForSelector(loginTextSelector, { visible: true, timeout: 3000 }).catch(() => null);

	if (isInvalidCookies) {
		console.log('Gagal, cookies tidak valid');
		process.exit(1);
	}

	const [fileChooser] = await Promise.all([
		page.waitForFileChooser(),
		page
			.locator('text/Add photo/video')
			.click()
			.catch(() => null),
	]);
	console.log('Mengupload asset(s)');
	await fileChooser.accept([`${cwd}/assets/${data.PATH}`]);

	console.log('Menulis caption');
	const captionTrigger = page.locator('text/Text');
	await captionTrigger.click();
	await page.keyboard.press('Tab');
	await page.keyboard.type(data.CAPTION);

	console.log('Menunggu tombol publish aktif');

	const publishButtonSelector = 'xpath=//div[@role="button" and .//div[text()="Publish"]]';
	const button = await page.waitForSelector(publishButtonSelector, { visible: true }).catch(() => null);

	const postButton = await page.$(publishButtonSelector);

	if (postButton && (await isFacebookPublishButtonEnable(button))) {
		console.log('Tombol publish valid');
		await postButton.click();
	}

	console.log('Berhasil diposting');
}

export { postFeed };
