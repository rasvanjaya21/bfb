import { randomDelay } from '@/libs/random-delay';
import type { Browser, BrowserContext, Page } from 'puppeteer-core';

type RowsResult = { done: number; skipped: number; failed: number; stopped: boolean };
type OpenPage = () => Promise<Page>;
type RowOutcome = { status: 'done' | 'skipped' | 'failed'; message?: string };
type InterRowDelay = { min: number; max: number };

// Each row runs in its own browser context and the context is closed afterwards, so cookies, localStorage,
// IndexedDB and service workers of one account can never reach the next row. If a context cannot be closed
// the run stops, because the next row would otherwise start next to the previous account's session.
// The context and page are opened only when the task asks for them: a row rejected by its own checks never
// opens a page, so it cannot race the stealth plugin, which is still preparing a page it just saw created.
// A task returns the reason its row was skipped, or nothing when the row is done. onRow hears every row's outcome
// right after its task; a context that cannot be closed is reported afterwards as a second, failed outcome.
// When processing multiple rows, an inter-row delay (cooldown) is applied between rows to mimic human pacing.
async function runBrowserRows<T>(browser: Browser, rows: T[], task: (openPage: OpenPage, row: T) => Promise<string | void>, onRow: (outcome: RowOutcome, row: T) => void | Promise<void> = () => {}, interRowDelay: InterRowDelay = { min: 5000, max: 15000 }): Promise<RowsResult> {
	const result: RowsResult = { done: 0, skipped: 0, failed: 0, stopped: false };

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]!;
		let context: BrowserContext | undefined;
		let page: Promise<Page> | undefined;
		const openPage: OpenPage = () =>
			(page ??= browser.createBrowserContext().then((created) => {
				context = created;
				return created.newPage();
			}));

		let outcome: RowOutcome;
		try {
			const skipReason = await task(openPage, row);
			outcome = skipReason === undefined ? { status: 'done' } : { status: 'skipped', message: skipReason };
		} catch (error) {
			outcome = { status: 'failed', message: (error as Error)?.message ?? String(error) };
		}
		result[outcome.status]++;
		await onRow(outcome, row);

		const cleaned = context
			? await context.close().then(
					() => true,
					() => false,
				)
			: true;

		if (!browser.connected) {
			result.stopped = true;
			break;
		}
		if (!cleaned) {
			await onRow({ status: 'failed', message: 'Sesi akun gagal dibersihkan, proses dihentikan' }, row);
			result.stopped = true;
			break;
		}

		const hasNext = i < rows.length - 1;
		if (hasNext && (interRowDelay.min > 0 || interRowDelay.max > 0)) {
			await randomDelay(interRowDelay.min, interRowDelay.max);
		}
	}

	return result;
}

export { runBrowserRows, type InterRowDelay, type OpenPage, type RowOutcome, type RowsResult };
