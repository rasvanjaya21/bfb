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
	// --disable-frame-rate-limit: when the window is not on screen (another workspace, xvfb-run) Chrome otherwise
	// produces only a few frames per second, so Facebook's composer never closes and every wait stalls until timeout.
	return puppeteer.launch({ headless: false, args: ['--window-size=1280,900', '--no-startup-window', '--disable-frame-rate-limit'], waitForInitialPage: false, defaultViewport: null, executablePath: driver.executablePath });
}

export { launchBrowser };
