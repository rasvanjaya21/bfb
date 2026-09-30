import { ACTIVATION_API_URL, ACTIVATION_TIMEOUT_MS } from '@/utils/constant';
import fs from 'fs/promises';
import path from 'path';

// The menu asks on every loop; once the server confirms a token, keep that answer for the session instead of
// asking again. The cache is keyed by the token, so a different token (re-activation) is checked afresh.
let activeToken: string | undefined;

async function checkActivation(timeoutMs: number = ACTIVATION_TIMEOUT_MS): Promise<boolean> {
	try {
		const filePath = path.join(process.cwd(), 'credentials', 'token.bfb');
		const token = (await fs.readFile(filePath, 'utf-8').catch(() => '')).trim();
		if (!token) return false;
		if (token === activeToken) return true;

		const response = await fetch(ACTIVATION_API_URL, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			signal: AbortSignal.timeout(timeoutMs),
		});
		const data = (await response.json()) as { state?: unknown } | null;

		if (data?.state !== true) return false;
		activeToken = token;
		return true;
	} catch {
		return false;
	}
}

export { checkActivation };
