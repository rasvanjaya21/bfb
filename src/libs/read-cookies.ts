import fs from 'fs/promises';

async function readCookies<T>(cookiePath: string): Promise<T[]> {
	const raw = await fs.readFile(cookiePath, 'utf-8');

	if (!raw.trim()) {
		return [];
	}

	const parsed = JSON.parse(raw);

	if (!Array.isArray(parsed)) {
		return [];
	}

	return parsed as T[];
}

export { readCookies };
