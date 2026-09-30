import { ACTIVATION_API_URL, ACTIVATION_TIMEOUT_MS } from '@/utils/constant';
import fs from 'fs/promises';
import path from 'path';

// The menu asks on every loop; once the server confirms, keep the answer for the session instead of asking again.
let activated = false;

function resetActivationCache(): void {
	activated = false;
}

async function checkActivation(timeoutMs: number = ACTIVATION_TIMEOUT_MS): Promise<boolean> {
	if (activated) return true;

	try {
		const filePath = path.join(process.cwd(), 'credentials', 'token.bfb');
		const token = (await fs.readFile(filePath, 'utf-8').catch(() => '')).trim();
		if (!token) return false;

		const response = await fetch(ACTIVATION_API_URL, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			signal: AbortSignal.timeout(timeoutMs),
		});
		const data = (await response.json()) as { state?: unknown } | null;

		activated = data?.state === true;
		return activated;
	} catch {
		return false;
	}
}

export { checkActivation, resetActivationCache };
