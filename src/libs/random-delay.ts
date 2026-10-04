function randomInt(min: number, max: number): number {
	if (min < 0 || max < 0) {
		throw new Error('min dan max tidak boleh negatif');
	}
	if (min > max) {
		throw new Error('min tidak boleh lebih besar dari max');
	}
	const minCeil = Math.ceil(min);
	const maxFloor = Math.floor(max);
	return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

function randomDelay(minMs: number, maxMs: number): Promise<number> {
	const duration = randomInt(minMs, maxMs);
	return new Promise<number>((resolve) => {
		setTimeout(() => resolve(duration), duration);
	});
}

export { randomDelay, randomInt };
