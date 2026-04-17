import { DRIVER_VERSION } from '@/utils/constant';
import { Browser, getInstalledBrowsers, type InstalledBrowser } from '@puppeteer/browsers';
import os from 'os';

async function checkDriver(): Promise<InstalledBrowser | undefined> {
	const homeDir = os.homedir();

	const installedrowsers = await getInstalledBrowsers({
		cacheDir: `${homeDir}/.cache`,
	});

	const installedBrowser = installedrowsers.find((item) => item.buildId === DRIVER_VERSION && item.browser === Browser.CHROME);

	return installedBrowser;
}

export { checkDriver };
