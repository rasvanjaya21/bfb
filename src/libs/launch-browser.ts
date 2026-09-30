import { checkDriver } from '@/libs/check-driver';
import puppeteerCore, { type Browser } from 'puppeteer-core';
import { addExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

async function launchBrowser(): Promise<Browser> {
	const driver = await checkDriver();
	if (!driver) throw new Error('Driver belum terpasang');

	const puppeteer = addExtra(puppeteerCore);
	puppeteer.use(StealthPlugin());
	return puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null, executablePath: driver.executablePath });
}

export { launchBrowser };
