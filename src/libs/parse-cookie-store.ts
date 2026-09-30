import { isReservedKey } from '@/libs/is-reserved-key';

// Entries that are not a cookie list are kept as they are, so saving one account never deletes them.
function parseCookieStore(raw: string): Map<string, unknown> {
	// trim() also drops a leading BOM.
	const text = raw.trim();
	const store = new Map<string, unknown>();

	if (!text) return store;

	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new Error('File cookies.json rusak');
	}

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		throw new Error('File cookies.json rusak');
	}

	for (const [key, value] of Object.entries(parsed)) {
		if (!isReservedKey(key)) store.set(key, value);
	}

	return store;
}

export { parseCookieStore };
