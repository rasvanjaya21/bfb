import { isReservedKey } from '@/libs/is-reserved-key';
import { parseCookieStore } from '@/libs/parse-cookie-store';
import fs from 'fs/promises';

async function readCookies<T = any>(cookiePath: string, idCookie: string): Promise<T[]> {
	if (isReservedKey(idCookie)) return [];

	const store = parseCookieStore(await fs.readFile(cookiePath, 'utf-8'));

	const cookies = store.get(idCookie);

	return (Array.isArray(cookies) ? cookies : []) as T[];
}

export { readCookies };
