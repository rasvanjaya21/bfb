import { runBrowserRows } from '@/libs/run-browser-rows';
import { describe, expect, test } from 'bun:test';
import type { Browser, Page } from 'puppeteer-core';

type FakeContext = { id: number; closed: boolean; jar: string[]; failClose: boolean };

function fakeBrowser(options: { failCloseAt?: number } = {}) {
	const contexts: FakeContext[] = [];
	const browser = {
		connected: true,
		createBrowserContext: async () => {
			const context: FakeContext = { id: contexts.length, closed: false, jar: [], failClose: contexts.length === options.failCloseAt };
			contexts.push(context);
			return {
				newPage: async () => ({ context }) as unknown as Page,
				close: async () => {
					if (context.failClose) throw new Error('close failed');
					context.closed = true;
				},
			};
		},
	};
	return { browser: browser as unknown as Browser & { connected: boolean }, contexts };
}

const contextOf = (page: Page) => (page as unknown as { context: FakeContext }).context;

describe('runBrowserRows', () => {
	test('gives every row its own browser context, so no cookie or storage crosses rows', async () => {
		const fake = fakeBrowser();
		const seen: string[][] = [];
		await runBrowserRows(fake.browser, ['a', 'b', 'c'], async (openPage, item) => {
			const context = contextOf(await openPage());
			context.jar.push(`session-${item}`);
			seen.push([...context.jar]);
		});
		expect(seen).toEqual([['session-a'], ['session-b'], ['session-c']]);
		expect(fake.contexts.map((context) => context.id)).toEqual([0, 1, 2]);
	});

	test('closes the context after every row, including rows that fail', async () => {
		const fake = fakeBrowser();
		const result = await runBrowserRows(fake.browser, [1, 2, 3], async (openPage, item) => {
			await openPage();
			if (item === 2) throw new Error('Trigger caption tidak ditemukan');
		});
		expect(fake.contexts.every((context) => context.closed)).toBe(true);
		expect(result).toEqual({ done: 2, skipped: 0, failed: 1, stopped: false });
	});

	test('stops the whole run when a context cannot be closed', async () => {
		const fake = fakeBrowser({ failCloseAt: 0 });
		const failures: string[] = [];
		const result = await runBrowserRows(
			fake.browser,
			[1, 2, 3],
			async (openPage) => void (await openPage()),
			(message) => failures.push(message),
		);
		expect(fake.contexts.length).toBe(1);
		expect(failures).toEqual(['Sesi akun gagal dibersihkan, proses dihentikan']);
		expect(result.stopped).toBe(true);
	});

	test('stops the loop when the browser disconnects', async () => {
		const fake = fakeBrowser();
		const seen: number[] = [];
		const result = await runBrowserRows(fake.browser, [1, 2, 3], async (openPage, item) => {
			await openPage();
			seen.push(item);
			if (item === 2) {
				fake.browser.connected = false;
				throw new Error('Protocol error: Connection closed.');
			}
		});
		expect(seen).toEqual([1, 2]);
		expect(result).toEqual({ done: 1, skipped: 0, failed: 1, stopped: true });
	});

	test('keeps going when only a tab closes and the browser is still connected', async () => {
		const fake = fakeBrowser();
		const result = await runBrowserRows(fake.browser, [1, 2], async (_openPage, item) => {
			if (item === 1) throw new Error('Target closed');
		});
		expect(result).toEqual({ done: 1, skipped: 0, failed: 1, stopped: false });
	});

	test('never opens a context for a row that does not ask for a page', async () => {
		const fake = fakeBrowser();
		const result = await runBrowserRows(fake.browser, [1, 2, 3], async (openPage, item) => {
			if (item === 2) return false;
			if (item === 3) throw new Error('Cookie tidak ditemukan');
			await openPage();
		});
		expect(fake.contexts.length).toBe(1);
		expect(result).toEqual({ done: 1, skipped: 1, failed: 1, stopped: false });
	});

	test('opens at most one context per row, however often the page is asked for', async () => {
		const fake = fakeBrowser();
		await runBrowserRows(fake.browser, [1], async (openPage) => {
			expect(await openPage()).toBe(await openPage());
		});
		expect(fake.contexts.length).toBe(1);
	});

	test('counts a row as skipped when the task returns false', async () => {
		const fake = fakeBrowser();
		const result = await runBrowserRows(fake.browser, [1, 2], async (_openPage, item) => item !== 2);
		expect(result).toEqual({ done: 1, skipped: 1, failed: 0, stopped: false });
	});

	test('reports each failure message to the caller', async () => {
		const fake = fakeBrowser();
		const failures: string[] = [];
		await runBrowserRows(
			fake.browser,
			[1],
			async () => {
				throw new Error('Cookie tidak valid');
			},
			(message) => failures.push(message),
		);
		expect(failures).toEqual(['Cookie tidak valid']);
	});
});
