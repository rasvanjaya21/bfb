import { hideQuestion } from '@/libs/hide-question';
import { describe, expect, spyOn, test } from 'bun:test';
import { PassThrough } from 'stream';

function fakeTerminal() {
	const input = Object.assign(new PassThrough(), {
		isRaw: false,
		setRawMode(mode: boolean) {
			input.isRaw = mode;
			return input;
		},
	});
	let written = '';
	const output = { write: (chunk: string) => ((written += chunk), true) };
	return { input, output, written: () => written };
}

describe('hideQuestion', () => {
	test('resolves when the answer and Enter arrive in one chunk (paste)', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('wrongtoken123\r');
		expect(await answer).toBe('wrongtoken123');
	});

	test('resolves when keys arrive one by one (typing)', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		for (const key of ['a', 'b', 'c', '\r']) terminal.input.write(key);
		expect(await answer).toBe('abc');
	});

	test('applies backspace and ignores escape sequences inside a chunk', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('abx\u007fc\u001b[D\td\r');
		expect(await answer).toBe('abcd');
	});

	test('a lone Esc key does not swallow Enter or the next character', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('\u001b');
		terminal.input.write('abc\r');
		expect(await answer).toBe('abc');
	});

	test('a lone Esc key does not turn a following O or [ into an escape sequence', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('\u001b');
		terminal.input.write('Ok[1\r');
		expect(await answer).toBe('Ok[1');
	});

	test('Esc immediately followed by Enter still submits', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('xy\u001b\r');
		expect(await answer).toBe('xy');
	});

	test('masks every character and never echoes the answer', async () => {
		const terminal = fakeTerminal();
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('secret\r');
		await answer;
		expect(terminal.written()).toBe('Masukkan token: ******\n');
	});

	test('Ctrl+C restores the terminal and exits with 0', () => {
		const terminal = fakeTerminal();
		const previous = (): void => {};
		terminal.input.on('data', previous);
		const exit = spyOn(process, 'exit').mockImplementation((() => undefined) as never);
		try {
			void hideQuestion('Masukkan token: ', terminal.input, terminal.output);
			terminal.input.emit('data', 'ab\u0003');
			expect(exit).toHaveBeenCalledWith(0);
			expect(terminal.input.isRaw).toBe(false);
			expect(terminal.input.rawListeners('data')).toEqual([previous]);
			expect(terminal.written()).toBe('Masukkan token: **\n');
		} finally {
			exit.mockRestore();
		}
	});

	test('restores raw mode and the previous data listeners', async () => {
		const terminal = fakeTerminal();
		const previous = (): void => {};
		terminal.input.on('data', previous);
		const answer = hideQuestion('Masukkan token: ', terminal.input, terminal.output);
		terminal.input.write('x\r');
		await answer;
		expect(terminal.input.isRaw).toBe(false);
		expect(terminal.input.rawListeners('data')).toEqual([previous]);
	});
});
