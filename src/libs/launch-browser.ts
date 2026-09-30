import { checkDriver } from '@/libs/check-driver';
import puppeteerCore, { type Browser } from 'puppeteer-core';
import { addExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

async function launchBrowser(): Promise<Browser> {
	const driver = await checkDriver();
	if (!driver) throw new Error('Driver belum terpasang');

	const puppeteer = addExtra(puppeteerCore);
	puppeteer.use(StealthPlugin());
	// No startup window: every row opens its own browser context (its own window) through runBrowserRows, so the
	// about:blank window Chrome would open first is never used. Chrome stays alive between rows without it.
	return puppeteer.launch({ headless: false, args: ['--start-maximized', '--no-startup-window'], waitForInitialPage: false, defaultViewport: null, executablePath: driver.executablePath });
}

export { launchBrowser };
