import { humanType, type HumanTypeOptions } from '@/libs/human-type';
import { describe, expect, test } from 'bun:test';
import type { Page } from 'puppeteer-core';

function createMockPage(recordedChars: string[]): Page {
	return {
		keyboard: {
			type: async (char: string) => {
				recordedChars.push(char);
			},
		},
	} as unknown as Page;
}

describe('humanType', () => {
	test('types every character in order with natural pauses', async () => {
		const recorded: string[] = [];
		const mockPage = createMockPage(recorded);

		const options: HumanTypeOptions = {
			minDelay: 1,
			maxDelay: 2,
			spacePauseMin: 2,
			spacePauseMax: 4,
		};

		await humanType(mockPage, 'Halo, dunia!', options);
		expect(recorded.join('')).toBe('Halo, dunia!');
		expect(recorded.length).toBe('Halo, dunia!'.length);
	});

	test('handles empty text without throwing or typing', async () => {
		const recorded: string[] = [];
		const mockPage = createMockPage(recorded);

		await humanType(mockPage, '');
		expect(recorded.length).toBe(0);
	});

	test('uses default delay options when options are omitted', async () => {
		const recorded: string[] = [];
		const mockPage = createMockPage(recorded);

		await humanType(mockPage, 'a b');
		expect(recorded.join('')).toBe('a b');
	});

	test('returns true when the whole text is typed', async () => {
		const recorded: string[] = [];
		expect(await humanType(createMockPage(recorded), 'a b', { minDelay: 0, maxDelay: 0, spacePauseMin: 0, spacePauseMax: 0, interrupt: async () => false })).toBe(true);
		expect(recorded.join('')).toBe('a b');
	});

	test('stops at the first word boundary where interrupt answers true and returns false', async () => {
		const recorded: string[] = [];
		let checks = 0;
		const typed = await humanType(createMockPage(recorded), 'Halo, dunia ini!', {
			minDelay: 0,
			maxDelay: 0,
			spacePauseMin: 0,
			spacePauseMax: 0,
			interrupt: async () => ++checks === 2,
		});
		expect(typed).toBe(false);
		expect(recorded.join('')).toBe('Halo, ');
	});
});
