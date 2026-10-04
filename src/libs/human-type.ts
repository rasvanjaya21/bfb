import { randomDelay } from '@/libs/random-delay';
import type { Page } from 'puppeteer-core';

interface HumanTypeOptions {
	minDelay?: number;
	maxDelay?: number;
	spacePauseMin?: number;
	spacePauseMax?: number;
	// Asked at every pause character; answering true stops typing there (e.g. a popup just took the focus).
	interrupt?: () => Promise<boolean>;
}

const PAUSE_CHARACTERS = new Set([' ', ',', '.', '!', '?', ';', ':', '\n']);

// Returns true when the whole text was typed, false when interrupt stopped it early.
async function humanType(page: Page, text: string, options?: HumanTypeOptions): Promise<boolean> {
	const minDelay = options?.minDelay ?? 40;
	const maxDelay = options?.maxDelay ?? 120;
	const spacePauseMin = options?.spacePauseMin ?? 150;
	const spacePauseMax = options?.spacePauseMax ?? 350;

	for (const char of text) {
		await page.keyboard.type(char);
		if (PAUSE_CHARACTERS.has(char)) {
			if (await options?.interrupt?.()) return false;
			await randomDelay(spacePauseMin, spacePauseMax);
		} else {
			await randomDelay(minDelay, maxDelay);
		}
	}
	return true;
}

export { humanType, type HumanTypeOptions };
