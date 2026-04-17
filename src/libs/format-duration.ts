function formatDuration(ms: number) {
	const totalSeconds = Math.floor(ms / 1000);
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;

	return `${h}j ${m}m ${s}d`;
}

export { formatDuration };
