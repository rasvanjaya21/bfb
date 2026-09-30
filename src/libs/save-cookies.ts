import { isReservedKey } from '@/libs/is-reserved-key';
import { parseCookieStore } from '@/libs/parse-cookie-store';
import { writeSecretFile } from '@/libs/write-secret-file';
import fs from 'fs/promises';

async function readStore(cookiePath: string): Promise<Map<string, unknown>> {
	try {
		return parseCookieStore(await fs.readFile(cookiePath, 'utf-8'));
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return new Map();
		throw error;
	}
}

async function saveCookies<T = any>(cookiePath: string, idCookie: string, cookies: T[]): Promise<void> {
	if (isReservedKey(idCookie)) throw new Error(`UID tidak valid: ${idCookie}`);

	const store = await readStore(cookiePath);
	store.set(idCookie, cookies);

	await writeSecretFile(cookiePath, JSON.stringify(Object.fromEntries(store), null, 2));
}

export { saveCookies };
