import { runBrowserRows, type RowOutcome } from '@/libs/run-browser-rows';
import { describe, expect, test } from 'bun:test';
import type { Browser, Page } from 'puppeteer-core';

type FakeContext = { id: number; closed: boolean; jar: string[]; failClose: boolean };

function fakeBrowser(options: { failCloseAt?: number; failCreateAt?: number; failPageAt?: number } = {}) {
	const contexts: FakeContext[] = [];
	const browser = {
		connected: true,
		createBrowserContext: async () => {
			if (contexts.length === options.failCreateAt) {
				contexts.push({ id: contexts.length, closed: false, jar: [], failClose: false });
				throw new Error('create failed');
			}
			const context: FakeContext = { id: contexts.length, closed: false, jar: [], failClose: contexts.length === options.failCloseAt };
			contexts.push(context);
			return {
				newPage: async () => {
					if (context.id === options.failPageAt) throw new Error('page failed');
					return { context } as unknown as Page;
				},
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

// Collects only the failure messages, as the screen shows them.
const failuresInto = (failures: string[]) => (outcome: RowOutcome) => {
	if (outcome.status === 'failed') failures.push(outcome.message ?? '');
};

describe('runBrowserRows', () => {
	test('gives every row its own browser context, so no cookie or storage crosses rows', async () => {
		const fake = fakeBrowser();
		const seen: string[][] = [];
		await runBrowserRows(fake.browser, ['a', 'b', 'c'], async (openPage, item) => {
			const context = contextOf(await openPage());
			context.jar.push(`session-${item}`);
			seen.push([...context.jar]);
		});
		expect(seen.length).toBe(3);
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
		const result = await runBrowserRows(fake.browser, [1, 2, 3], async (openPage) => void (await openPage()), failuresInto(failures));
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
			if (item === 2) return 'Masih dalam tahap pengembangan';
			if (item === 3) throw new Error('Cookie tidak ditemukan');
			await openPage();
		});
		expect(fake.contexts.length).toBe(1);
		expect(result).toEqual({ done: 1, skipped: 1, failed: 1, stopped: false });
	});

	test('opens at most one context per row, however often the page is asked for', async () => {
		const fake = fakeBrowser();
		const pages: Page[] = [];
		const result = await runBrowserRows(fake.browser, [1], async (openPage) => {
			pages.push(await openPage(), await openPage());
		});
		expect(result.failed).toBe(0);
		expect(pages[0]).toBe(pages[1]!);
		expect(fake.contexts.length).toBe(1);
	});

	test('counts a row as failed and keeps going when its context cannot be created', async () => {
		const fake = fakeBrowser({ failCreateAt: 0 });
		const failures: string[] = [];
		const result = await runBrowserRows(fake.browser, [1, 2], async (openPage) => void (await openPage()), failuresInto(failures));
		expect(failures).toEqual(['create failed']);
		expect(result).toEqual({ done: 1, skipped: 0, failed: 1, stopped: false });
	});

	test('closes the context when opening its page fails', async () => {
		const fake = fakeBrowser({ failPageAt: 0 });
		const result = await runBrowserRows(fake.browser, [1, 2], async (openPage) => void (await openPage()));
		expect(fake.contexts[0]!.closed).toBe(true);
		expect(result).toEqual({ done: 1, skipped: 0, failed: 1, stopped: false });
	});

	test('counts a row as skipped when the task returns a reason', async () => {
		const fake = fakeBrowser();
		const result = await runBrowserRows(fake.browser, [1, 2], async (_openPage, item) => (item === 2 ? 'Cookie tidak di simpan' : undefined));
		expect(result).toEqual({ done: 1, skipped: 1, failed: 0, stopped: false });
	});

	test('counts a row as skipped even when its reason is empty', async () => {
		const fake = fakeBrowser();
		const reports: RowOutcome[] = [];
		const result = await runBrowserRows(
			fake.browser,
			[1],
			async () => '',
			(outcome) => reports.push(outcome),
		);
		expect(result).toEqual({ done: 0, skipped: 1, failed: 0, stopped: false });
		expect(reports).toEqual([{ status: 'skipped', message: '' }]);
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
			failuresInto(failures),
		);
		expect(failures).toEqual(['Cookie tidak valid']);
	});

	test('reports every row once, with the reason for a skip and the message for a failure', async () => {
		const fake = fakeBrowser();
		const reports: [RowOutcome, number][] = [];
		const result = await runBrowserRows(
			fake.browser,
			[1, 2, 3],
			async (openPage, item) => {
				await openPage();
				if (item === 2) return 'Masih dalam tahap pengembangan';
				if (item === 3) throw new Error('Cookie tidak valid');
			},
			(outcome, row) => reports.push([outcome, row]),
		);
		expect(reports).toEqual([
			[{ status: 'done' }, 1],
			[{ status: 'skipped', message: 'Masih dalam tahap pengembangan' }, 2],
			[{ status: 'failed', message: 'Cookie tidak valid' }, 3],
		]);
		expect(result).toEqual({ done: 1, skipped: 1, failed: 1, stopped: false });
	});

	test('reports a context that cannot be closed after the row it belongs to', async () => {
		const fake = fakeBrowser({ failCloseAt: 0 });
		const reports: [RowOutcome, number][] = [];
		const result = await runBrowserRows(
			fake.browser,
			[1, 2],
			async (openPage) => void (await openPage()),
			(outcome, row) => reports.push([outcome, row]),
		);
		expect(reports).toEqual([
			[{ status: 'done' }, 1],
			[{ status: 'failed', message: 'Sesi akun gagal dibersihkan, proses dihentikan' }, 1],
		]);
		expect(result).toEqual({ done: 1, skipped: 0, failed: 0, stopped: true });
	});
});
