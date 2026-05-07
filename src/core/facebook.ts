import { applyDelay } from '@/libs/apply-delay';
import { checkDriver } from '@/libs/check-driver';
import { csvToJson } from '@/libs/csv-parser';
import { formatDuration } from '@/libs/format-duration';
import { readCookies } from '@/libs/read-cookies';
import { type Content } from '@/types/global';
import chalk from 'chalk';
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
	try {
		console.log('===============================');
		console.log(`Data konten nomor ${content.NO}`);

		console.log('Mengecek rute upload');
		if (!content.ROUTE || (content.ROUTE !== 'BM' && content.ROUTE !== 'PERSONAL')) {
			throw new Error('Rute upload kosong/unsupported');
		}
		console.log(`Rute upload ${content.ROUTE.toLowerCase()}`);

		const page = await browser.newPage();
		const pages = await browser.pages();
		const initialPage = pages[0];
		await initialPage?.close();

		// DEFAULT BFB
		page.setDefaultTimeout(5000);

		// DEFAULT PUPPETEER
		page.setDefaultNavigationTimeout(30000);

		console.log('Menginject cookies');
		const cookiesPath = `${cwd}/credentials/cookies.json`;
		const cookies = await readCookies<CookieData>(cookiesPath, content.COOKIE);
		await browser.setCookie(...cookies);

		console.log('Membuka facebook');
		const link = content.ROUTE === 'BM' ? `https://business.facebook.com/latest/composer/?asset_id=${content.IDFANSPAGE}&ref=biz_web_home_create_post` : 'https://web.facebook.com/login.php?next=https://web.facebook.com/profile';
		const pageOpener = await page.goto(link, { waitUntil: 'networkidle2' }).catch(() => null);
		if (!pageOpener) {
			await browser.deleteMatchingCookies(...cookies);
			throw new Error('Facebook tidak terbuka');
		}
		console.log('Facebook terbuka');

		console.log('Memvalidasi cookie');
		const isInvalidCookies = page.url().includes('login');
		if (isInvalidCookies) {
			await browser.deleteMatchingCookies(...cookies);
			throw new Error('Cookie tidak valid');
		}
		console.log('Cookie valid');

		console.log('Mengecek tipe konten');
		if (!content.TYPE || (content.TYPE !== 'POST' && content.TYPE !== 'FEED' && content.TYPE !== 'REEL' && content.TYPE !== 'STORY')) {
			await browser.deleteMatchingCookies(...cookies);
			throw new Error('Tipe konten kosong/unsupported');
		}
		console.log(`Tipe konten ${content.TYPE.toLowerCase()}`);

		console.log('Mulai memposting konten');

		// BM
		if (content.ROUTE === 'BM' && content.TYPE === 'POST') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		if (content.ROUTE === 'BM' && content.TYPE === 'FEED') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		if (content.ROUTE === 'BM' && content.TYPE === 'REEL') {
			console.log('Tipe konten photo dalam pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		if (content.ROUTE === 'BM' && content.TYPE === 'STORY') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		// PERSONAL
		if (content.ROUTE === 'PERSONAL' && content.TYPE === 'POST') {
			console.log('Mencari trigger caption');
			const captionSelector = `xpath=//div[@role="button" and .//span[text()="What's on your mind?"]]`;
			const captionTrigger = await page
				.locator(captionSelector)
				.waitHandle()
				.catch(() => null);

			if (!captionTrigger) {
				await browser.deleteMatchingCookies(...cookies);
				throw new Error('Trigger caption tidak ditemukan');
			}
			await captionTrigger.click();
			console.log('Trigger caption ditemukan');

			console.log('Menulis caption');
			const createPostSelector = 'text=Add to your post';
			await page.locator(createPostSelector).wait();
			await page.keyboard.type(content.CAPTION + ' ');
			await page.keyboard.press('Tab');

			console.log('Mencari tombol next');
			const nextPostSelector = 'text=Next';
			const nextPostTrigger = await page
				.locator(nextPostSelector)
				.waitHandle()
				.catch(() => null);

			// WITHOUT NEXT CASE
			if (!nextPostTrigger) {
				console.log('Tombol next tidak ditemukan');
				console.log('Memvalidasi publish');

				const postSelector = `xpath=//div[@role="button" and .//span[text()="Post"]]`;
				const postTrigger = await page
					.locator(postSelector)
					.waitHandle()
					.catch(() => null);

				if (!postTrigger) {
					await browser.deleteMatchingCookies(...cookies);
					throw new Error('Publish tidak valid');
				}
				await postTrigger.click();
				console.log('Publish valid');
			}

			// WITH NEXT CASE
			if (nextPostTrigger) {
				await nextPostTrigger.click();
				console.log('Tombol next ditemukan');

				console.log('Memvalidasi publish');
				const postPreviewSelector = 'text=Post preview';
				const postPreviewTrigger = await page
					.locator(postPreviewSelector)
					.waitHandle()
					.catch(() => null);

				if (!postPreviewTrigger) {
					await browser.deleteMatchingCookies(...cookies);
					throw new Error('Publish tidak valid');
				}
				await postPreviewTrigger.click();
				await page.keyboard.down('Shift');
				await page.keyboard.press('Tab');
				await page.keyboard.up('Shift');
				await page.keyboard.press('Enter');
				console.log('Publish valid');
			}
		}

		if (content.ROUTE === 'PERSONAL' && content.TYPE === 'FEED') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		if (content.ROUTE === 'PERSONAL' && content.TYPE === 'REEL') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		if (content.ROUTE === 'PERSONAL' && content.TYPE === 'STORY') {
			console.log('Masih dalam tahap pengembangan');
			await browser.deleteMatchingCookies(...cookies);
			return;
		}

		console.log(chalk.green('Selesai memposting konten'));
		await browser.deleteMatchingCookies(...cookies);
	} catch (error) {
		const message = (error as Error).message;
		if (message.includes('closed')) {
			console.log('Koneksi tertutup');
			console.log(chalk.red('Gagal memposting konten'));
			console.log('===============================\n');
			process.exit(0);
		}

		console.log(message);
		console.log(chalk.red('Gagal memposting konten'));
		return;
	}
}

export { postFeed };
