import type readline from 'readline/promises';

// Asks a (y/N) question and resolves true only for 'y'. Without a terminal (cron, a pipe that has ended) readline closes
// and question() never settles, so a closed input counts as 'N' instead of leaving the run, and Chrome, waiting forever.
async function askYesNo(readlineInterface: readline.Interface, question: string): Promise<boolean> {
	const noInput = (): false => {
		console.log('Tidak ada input, dianggap N');
		return false;
	};
	if ((readlineInterface as readline.Interface & { closed?: boolean }).closed) return noInput();
	const closed = new Promise<null>((resolve) => readlineInterface.once('close', () => resolve(null)));
	const answer = await Promise.race([readlineInterface.question(question).catch(() => ''), closed]);
	if (answer === null) return noInput();
	return answer.trim().toLowerCase() === 'y';
}

export { askYesNo };
