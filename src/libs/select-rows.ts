// Keeps the CSV rows whose NO is in explicit (CSV order, NO compared as a number), and reports the NO values that are
// not in the CSV. Without explicit every row is kept.
function selectRows<T extends { NO: string }>(rows: T[], explicit?: number[]): { rows: T[]; missing: number[] } {
	if (!explicit) return { rows, missing: [] };
	const present = new Set(rows.map((row) => Number(row.NO)));
	return { rows: rows.filter((row) => explicit.includes(Number(row.NO))), missing: explicit.filter((no) => !present.has(no)) };
}

export { selectRows };
