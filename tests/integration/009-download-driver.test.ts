import { downloadDriver } from '@/libs/download-driver';
import { DRIVER_VERSION } from '@/utils/constant';
import { BrowserPlatform, type InstallOptions } from '@puppeteer/browsers';
import { beforeEach, describe, expect, spyOn, test } from 'bun:test';
import os from 'os';

let screen: string[];

beforeEach(() => {
	screen = [];
	spyOn(console, 'clear').mockImplementation(() => {});
	spyOn(console, 'log').mockImplementation((message: string) => void screen.push(message));
});

describe('downloadDriver', () => {
	test('installs the pinned Chrome build into ~/.cache and reports success', async () => {
		const calls: InstallOptions[] = [];
		const outcome = await downloadDriver(
			() => BrowserPlatform.LINUX,
			async (options) => void calls.push(options),
		);
		expect(calls.length).toBe(1);
		expect(calls[0]).toMatchObject({ buildId: DRIVER_VERSION, platform: BrowserPlatform.LINUX, cacheDir: `${os.homedir()}/.cache` });
		expect(outcome).toEqual({ ok: true, message: `Chrome v${DRIVER_VERSION} sudah terpasang` });
		expect(screen).toContain(`Chrome v${DRIVER_VERSION} sudah terpasang\n`);
	});

	test('reports a failed download without throwing', async () => {
		const outcome = await downloadDriver(
			() => BrowserPlatform.LINUX,
			async () => {
				throw new Error('socket hang up');
			},
		);
		expect(outcome).toEqual({ ok: false, message: 'Server error, instalasi driver gagal' });
		expect(screen).toContain('Server error, instalasi driver gagal\n');
	});

	test('refuses an unsupported platform before downloading anything', async () => {
		let installed = false;
		const outcome = await downloadDriver(
			() => undefined,
			async () => void (installed = true),
		);
		const message = `Platform ${os.platform()} ${os.arch()} tidak didukung, instalasi driver gagal`;
		expect(installed).toBe(false);
		expect(outcome).toEqual({ ok: false, message });
		expect(screen).toContain(`${message}\n`);
	});
});
