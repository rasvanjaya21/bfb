import { randomDelay, randomInt } from '@/libs/random-delay';
import { describe, expect, test } from 'bun:test';

describe('randomInt', () => {
	test('returns an integer within [min, max]', () => {
		for (let i = 0; i < 50; i++) {
			const val = randomInt(5, 15);
			expect(Number.isInteger(val)).toBe(true);
			expect(val).toBeGreaterThanOrEqual(5);
			expect(val).toBeLessThanOrEqual(15);
		}
	});

	test('returns min when min equals max', () => {
		expect(randomInt(10, 10)).toBe(10);
	});

	test('throws when min is greater than max', () => {
		expect(() => randomInt(20, 10)).toThrow('min tidak boleh lebih besar dari max');
	});

	test('throws when min or max is negative', () => {
		expect(() => randomInt(-5, 10)).toThrow('min dan max tidak boleh negatif');
		expect(() => randomInt(5, -10)).toThrow('min dan max tidak boleh negatif');
	});
});

describe('randomDelay', () => {
	test('waits asynchronously and returns the waited duration', async () => {
		const start = Date.now();
		const waited = await randomDelay(20, 50);
		const elapsed = Date.now() - start;
		expect(waited).toBeGreaterThanOrEqual(20);
		expect(waited).toBeLessThanOrEqual(50);
		expect(elapsed).toBeGreaterThanOrEqual(15);
	});

	test('throws when min is greater than max', () => {
		expect(() => randomDelay(50, 10)).toThrow('min tidak boleh lebih besar dari max');
	});
});
