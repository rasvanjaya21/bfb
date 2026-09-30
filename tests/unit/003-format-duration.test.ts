import { formatDuration } from '@/libs/format-duration';
import { describe, expect, test } from 'bun:test';

describe('formatDuration', () => {
	test('formats hours, minutes and seconds', () => {
		expect(formatDuration(0)).toBe('00j 00m 00d');
		expect(formatDuration(999)).toBe('00j 00m 00d');
		expect(formatDuration(61_000)).toBe('00j 01m 01d');
		expect(formatDuration(3_600_000)).toBe('01j 00m 00d');
	});

	test('keeps counting past 99 hours', () => {
		expect(formatDuration(100 * 3_600_000)).toBe('100j 00m 00d');
	});

	test('treats negative or invalid durations as zero', () => {
		expect(formatDuration(-5000)).toBe('00j 00m 00d');
		expect(formatDuration(Number.NaN)).toBe('00j 00m 00d');
	});
});
