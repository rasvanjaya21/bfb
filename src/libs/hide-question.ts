function hideQuestion(prompt: string): Promise<string> {
	return new Promise((resolve) => {
		process.stdout.write(prompt);

		const stdin = process.stdin;
		const wasRaw = stdin.isRaw;

		const prevListeners = stdin.rawListeners('data') as ((...args: unknown[]) => void)[];
		stdin.removeAllListeners('data');

		stdin.setRawMode(true);
		stdin.resume();
		stdin.setEncoding('utf-8');

		let input = '';
		let stars = 0;

		const cleanup = () => {
			stdin.setRawMode(wasRaw ?? false);
			stdin.pause();
			stdin.removeListener('data', onData);
			for (const listener of prevListeners) {
				stdin.on('data', listener);
			}
		};

		const onData = (char: string) => {
			if (char === '\r' || char === '\n') {
				cleanup();
				process.stdout.write('\n');
				resolve(input);
			} else if (char === '\u0003') {
				cleanup();
				process.stdout.write('\n');
				process.exit(0);
			} else if (char === '\u007f' || char === '\b') {
				if (stars > 0) {
					input = input.slice(0, -1);
					stars--;
					process.stdout.write('\b \b');
				}
			} else if (char.startsWith('\u001b') || char === '\t') {
			} else {
				input += char;
				stars++;
				process.stdout.write('*');
			}
		};

		stdin.on('data', onData);
	});
}

export { hideQuestion };
