function formatDuration(ms: number) {
	const totalSeconds = Math.floor(ms / 1000);

	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;

	const hh = String(h).padStart(2, '0');
	const mm = String(m).padStart(2, '0');
	const ss = String(s).padStart(2, '0');

	return `${hh}j ${mm}m ${ss}d`;
}

export { formatDuration };
