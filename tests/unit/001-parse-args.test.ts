import { parseArgs } from '@/libs/parse-args';
import { describe, expect, test } from 'bun:test';

describe('parseArgs', () => {
	test('opens the menu without arguments', () => {
		expect(parseArgs([])).toEqual({ command: 'menu' });
	});

	test('recognises every version form', () => {
		for (const arg of ['version', '--version', '-v']) expect(parseArgs([arg])).toEqual({ command: 'version' });
	});

	test('recognises every help form', () => {
		for (const arg of ['help', '--help', '-h']) expect(parseArgs([arg])).toEqual({ command: 'help' });
	});

	test('version wins over help when both are given', () => {
		expect(parseArgs(['--help', '-v'])).toEqual({ command: 'version' });
	});

	test('reports the first unknown argument', () => {
		expect(parseArgs(['--bogus'])).toEqual({ command: 'unknown', flag: '--bogus' });
		expect(parseArgs(['start', 'x'])).toEqual({ command: 'unknown', flag: 'start' });
	});
});
