type HiddenInput = NodeJS.ReadableStream & { isRaw?: boolean; setRawMode?: (mode: boolean) => unknown };
type HiddenOutput = { write: (chunk: string) => boolean };

function hideQuestion(prompt: string, stdin: HiddenInput = process.stdin, stdout: HiddenOutput = process.stdout): Promise<string> {
	return new Promise((resolve) => {
		stdout.write(prompt);

		const wasRaw = stdin.isRaw;

		const prevListeners = stdin.rawListeners('data') as ((...args: unknown[]) => void)[];
		stdin.removeAllListeners('data');

		stdin.setRawMode?.(true);
		stdin.resume();
		stdin.setEncoding('utf-8');

		let input = '';
		// 'esc' right after ESC, 'sequence' inside an escape sequence such as the arrow key ESC [ D.
		let escape: 'none' | 'esc' | 'sequence' = 'none';

		const cleanup = () => {
			stdin.setRawMode?.(wasRaw ?? false);
			stdin.pause();
			stdin.removeListener('data', onData);
			for (const listener of prevListeners) {
				stdin.on('data', listener);
			}
		};

		// A chunk can hold several keys at once (fast typing, key repeat, paste), so handle it key by key.
		const onData = (chunk: string | Buffer) => {
			for (const char of chunk.toString()) {
				if (escape === 'sequence') {
					if (/[A-Za-z~]/.test(char)) escape = 'none';
					continue;
				}
				if (escape === 'esc') {
					escape = 'none';
					if (char === '[' || char === 'O') {
						escape = 'sequence';
						continue;
					}
				}

				if (char === '\r' || char === '\n') {
					cleanup();
					stdout.write('\n');
					resolve(input);
					return;
				} else if (char === '\u0003') {
					cleanup();
					stdout.write('\n');
					process.exit(0);
				} else if (char === '\u007f' || char === '\b') {
					if (input.length > 0) {
						input = input.slice(0, -1);
						stdout.write('\b \b');
					}
				} else if (char === '\u001b') {
					escape = 'esc';
				} else if (char >= ' ') {
					input += char;
					stdout.write('*');
				}
			}
			// A chunk that ends right after ESC was the Esc key itself, not the start of a sequence.
			if (escape === 'esc') escape = 'none';
		};

		stdin.on('data', onData);
	});
}

export { hideQuestion };
