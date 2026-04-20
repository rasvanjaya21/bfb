import fs from 'fs/promises';

async function saveCookies<T = any>(cookiePath: string, idCookie: string, cookies: T[]): Promise<void> {
	let existing: Record<string, unknown> = {};

	try {
		const raw = await fs.readFile(cookiePath, 'utf-8');

		if (raw.trim()) {
			const parsed = JSON.parse(raw);

			if (typeof parsed === 'object' && parsed !== null) {
				existing = parsed;
			}
		}
	} catch {}

	existing[idCookie] = cookies;

	await fs.writeFile(cookiePath, JSON.stringify(existing, null, 2), 'utf-8');
}

export { saveCookies };
