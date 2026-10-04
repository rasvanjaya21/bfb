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

	test('help and version win over bypass', () => {
		expect(parseArgs(['-b', '1', '-h'])).toEqual({ command: 'help' });
		expect(parseArgs(['-b', '1', '-e', '2', '-v'])).toEqual({ command: 'version' });
	});

	test('reports the first unknown argument', () => {
		expect(parseArgs(['--bogus'])).toEqual({ command: 'unknown', flag: '--bogus' });
		expect(parseArgs(['start', 'x'])).toEqual({ command: 'unknown', flag: 'start' });
		expect(parseArgs(['-b', '1', '--bypass=95'])).toEqual({ command: 'unknown', flag: '--bypass=95' });
	});

	describe('bypass and explicit', () => {
		test('bypasses menu 1 or 95 for every row', () => {
			expect(parseArgs(['-b', '1'])).toEqual({ command: 'bypass', menu: '1' });
			expect(parseArgs(['--bypass', '95'])).toEqual({ command: 'bypass', menu: '95' });
		});

		test('limits the run to the given NO values, in any flag order', () => {
			expect(parseArgs(['-b', '95', '-e', '1'])).toEqual({ command: 'bypass', menu: '95', explicit: [1] });
			expect(parseArgs(['-e', '2', '-b', '1'])).toEqual({ command: 'bypass', menu: '1', explicit: [2] });
			expect(parseArgs(['--bypass', '1', '--explicit', '2,3'])).toEqual({ command: 'bypass', menu: '1', explicit: [2, 3] });
		});

		test('drops duplicate NO values and keeps their first order', () => {
			expect(parseArgs(['-b', '1', '--explicit', '2,3,1,99,21,3'])).toEqual({ command: 'bypass', menu: '1', explicit: [2, 3, 1, 99, 21] });
		});

		test('rejects explicit without bypass', () => {
			expect(parseArgs(['-e', '2'])).toEqual({ command: 'invalid', message: '-e/--explicit butuh -b/--bypass' });
		});

		test('rejects bypass without a menu number', () => {
			const message = '-b/--bypass butuh nomor menu (1 atau 95)';
			expect(parseArgs(['-b'])).toEqual({ command: 'invalid', message });
			expect(parseArgs(['-b', '-e', '2,3'])).toEqual({ command: 'invalid', message });
		});

		test('rejects a menu that cannot be bypassed', () => {
			expect(parseArgs(['-b', '2'])).toEqual({ command: 'invalid', message: 'Menu 2 tidak bisa di-bypass, pilih 1 atau 95' });
		});

		test('rejects explicit values that are not positive whole numbers', () => {
			const message = '-e/--explicit butuh NO berupa angka positif, contoh: -e 2,3';
			for (const args of [
				['-b', '1', '-e'],
				['-b', '1', '-e', '2,x'],
				['-b', '1', '-e', '0'],
				['-b', '1', '-e', '2,,3'],
				['-b', '1', '-e', '-b'],
			]) {
				expect(parseArgs(args)).toEqual({ command: 'invalid', message });
			}
		});

		test('rejects a flag written twice', () => {
			expect(parseArgs(['-b', '1', '-b', '95'])).toEqual({ command: 'invalid', message: 'Flag -b/--bypass ditulis lebih dari sekali' });
			expect(parseArgs(['-b', '1', '-e', '2', '--explicit', '3'])).toEqual({ command: 'invalid', message: 'Flag -e/--explicit ditulis lebih dari sekali' });
		});
	});
});
