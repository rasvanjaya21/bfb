import { askYesNo } from '@/libs/ask-yes-no';
import { describe, expect, spyOn, test } from 'bun:test';
import { EventEmitter } from 'events';
import type readline from 'readline/promises';

// A readline stand-in: question() resolves with the given answer, or never resolves when answer is undefined.
function fakeReadline(answer?: string | Error, closed = false): readline.Interface & EventEmitter & { asked: string[] } {
	const rl = Object.assign(new EventEmitter(), {
		closed,
		asked: [] as string[],
		question(prompt: string): Promise<string> {
			rl.asked.push(prompt);
			if (answer instanceof Error) return Promise.reject(answer);
			return answer === undefined ? new Promise<string>(() => {}) : Promise.resolve(answer);
		},
	});
	return rl as unknown as readline.Interface & EventEmitter & { asked: string[] };
}

describe('askYesNo', () => {
	test('is true only for y, in any case and with surrounding spaces', async () => {
		expect(await askYesNo(fakeReadline('y'), 'Simpan cookie? (y/N) ')).toBe(true);
		expect(await askYesNo(fakeReadline(' Y '), 'Simpan cookie? (y/N) ')).toBe(true);
		for (const answer of ['', 'n', 'N', 'yes', 'ya']) expect(await askYesNo(fakeReadline(answer), 'Simpan cookie? (y/N) ')).toBe(false);
	});

	test('asks the given question', async () => {
		const rl = fakeReadline('y');
		await askYesNo(rl, 'Sudah menyetujui privasi? (y/N) ');
		expect(rl.asked).toEqual(['Sudah menyetujui privasi? (y/N) ']);
	});

	test('answers N without asking when the input is already closed (no terminal, stdin at its end)', async () => {
		const log = spyOn(console, 'log').mockImplementation(() => {});
		const rl = fakeReadline(undefined, true);
		expect(await askYesNo(rl, 'Simpan cookie? (y/N) ')).toBe(false);
		expect(rl.asked).toEqual([]);
		expect(log).toHaveBeenCalledWith('Tidak ada input, dianggap N');
		log.mockRestore();
	});

	test('answers N when the input closes while waiting', async () => {
		const log = spyOn(console, 'log').mockImplementation(() => {});
		const rl = fakeReadline();
		const answer = askYesNo(rl, 'Simpan cookie? (y/N) ');
		rl.emit('close');
		expect(await answer).toBe(false);
		expect(log).toHaveBeenCalledWith('Tidak ada input, dianggap N');
		log.mockRestore();
	});

	test('answers N when the question itself fails', async () => {
		expect(await askYesNo(fakeReadline(new Error('closed')), 'Simpan cookie? (y/N) ')).toBe(false);
	});
});
