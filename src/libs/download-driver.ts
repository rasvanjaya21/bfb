import { applyDelay } from '@/libs/apply-delay';
import { resolvePlatform } from '@/libs/resolve-platform';
import { DRIVER_VERSION } from '@/utils/constant';
import { Browser, install } from '@puppeteer/browsers';
import os from 'os';

async function downloadDriver(): Promise<void> {
	const homeDir = os.homedir();

	console.clear();
	console.log('Proses instalasi driver\n');
	await applyDelay(1000);

	try {
		await install({
			browser: Browser.CHROME,
			buildId: DRIVER_VERSION,
			platform: resolvePlatform(),
			cacheDir: `${homeDir}/.cache`,
		});

		console.clear();
		console.log(`Chrome v${DRIVER_VERSION} sudah terpasang\n`);
		await applyDelay(1000);
	} catch {
		console.clear();
		console.log('Server error, instalasi driver gagal\n');
		await applyDelay(1000);
	}
}

export { downloadDriver };
