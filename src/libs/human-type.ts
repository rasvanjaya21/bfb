import { randomDelay } from '@/libs/random-delay';
import type { Page } from 'puppeteer-core';

interface HumanTypeOptions {
	minDelay?: number;
	maxDelay?: number;
	spacePauseMin?: number;
	spacePauseMax?: number;
}

const PAUSE_CHARACTERS = new Set([' ', ',', '.', '!', '?', ';', ':', '\n']);

async function humanType(page: Page, text: string, options?: HumanTypeOptions): Promise<void> {
	const minDelay = options?.minDelay ?? 40;
	const maxDelay = options?.maxDelay ?? 120;
	const spacePauseMin = options?.spacePauseMin ?? 150;
	const spacePauseMax = options?.spacePauseMax ?? 350;

	for (const char of text) {
		await page.keyboard.type(char);
		if (PAUSE_CHARACTERS.has(char)) {
			await randomDelay(spacePauseMin, spacePauseMax);
		} else {
			await randomDelay(minDelay, maxDelay);
		}
	}
}

export { humanType, type HumanTypeOptions };
