import { ACTIVATION_API_URL, ACTIVATION_TIMEOUT_MS } from '@/utils/constant';

type ActivationResult = { status: 'valid'; token: string } | { status: 'invalid' } | { status: 'error' };

// Printable ASCII without spaces, so the token is always safe to send back in an Authorization header.
const TOKEN_PATTERN = /^[\x21-\x7e]{1,4096}$/;

// The server answers an invalid token with HTTP 500 and {"state":false}, so the body decides, not response.ok.
async function requestActivation(input: string, timeoutMs: number = ACTIVATION_TIMEOUT_MS): Promise<ActivationResult> {
	// Typed input goes into the Authorization header too; anything that cannot be sent there is not a token.
	if (!TOKEN_PATTERN.test(input)) return { status: 'invalid' };

	let data: unknown;
	try {
		const response = await fetch(ACTIVATION_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input}` },
			signal: AbortSignal.timeout(timeoutMs),
		});
		data = await response.json();
	} catch {
		return { status: 'error' };
	}

	const token = (data as { token?: unknown } | null)?.token;
	if (typeof token !== 'string' || !TOKEN_PATTERN.test(token)) return { status: 'invalid' };

	return { status: 'valid', token };
}

export { requestActivation, type ActivationResult };
