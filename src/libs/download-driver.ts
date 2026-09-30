import { applyDelay } from '@/libs/apply-delay';
import type { Outcome } from '@/types/global';
import { DRIVER_VERSION } from '@/utils/constant';
import { Browser, detectBrowserPlatform, install, type InstallOptions } from '@puppeteer/browsers';
import os from 'os';

async function showResult(ok: boolean, message: string): Promise<Outcome> {
	console.clear();
	console.log(`${message}\n`);
	await applyDelay(1000);
	return { ok, message };
}

// detect and installChrome default to @puppeteer/browsers; tests pass fakes so no Chrome is downloaded.
async function downloadDriver(detect: typeof detectBrowserPlatform = detectBrowserPlatform, installChrome: (options: InstallOptions & { unpack?: true }) => Promise<unknown> = install): Promise<Outcome> {
	const homeDir = os.homedir();

	console.clear();
	console.log('Proses instalasi driver\n');
	await applyDelay(1000);

	const platform = detect();
	if (!platform) return showResult(false, `Platform ${os.platform()} ${os.arch()} tidak didukung, instalasi driver gagal`);

	try {
		await installChrome({
			browser: Browser.CHROME,
			buildId: DRIVER_VERSION,
			platform,
			cacheDir: `${homeDir}/.cache`,
		});
	} catch {
		return showResult(false, 'Server error, instalasi driver gagal');
	}

	return showResult(true, `Chrome v${DRIVER_VERSION} sudah terpasang`);
}

export { downloadDriver };
