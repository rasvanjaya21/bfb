import fs from 'fs/promises';

async function readCookies<T = any>(cookiePath: string, idCookie: string): Promise<T[]> {
	const raw = await fs.readFile(cookiePath, 'utf-8');

	if (!raw.trim()) {
		return [];
	}

	let parsed: Record<string, unknown>;

	try {
		parsed = JSON.parse(raw);
	} catch {
		return [];
	}

	if (typeof parsed !== 'object' || parsed === null) {
		return [];
	}

	const cookies = (parsed as Record<string, unknown>)[idCookie];

	if (!Array.isArray(cookies)) {
		return [];
	}

	return cookies as T[];
}

export { readCookies };
