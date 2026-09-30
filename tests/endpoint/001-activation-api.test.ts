import { checkActivation, resetActivationCache } from '@/libs/check-activation';
import { requestActivation } from '@/libs/request-activation';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const realFetch = globalThis.fetch;
const realCwd = process.cwd();
let dir: string;
let calls: number;

function mockFetch(handler: () => Promise<Response>): void {
	globalThis.fetch = (async () => {
		calls++;
		return handler();
	}) as unknown as typeof fetch;
}

const json =
	(body: unknown, status = 200) =>
	async () =>
		new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-activation-'));
	process.chdir(dir);
	calls = 0;
	resetActivationCache();
});

afterEach(async () => {
	globalThis.fetch = realFetch;
	process.chdir(realCwd);
	await rm(dir, { recursive: true, force: true });
});

async function saveToken(token: string): Promise<void> {
	await mkdir(join(dir, 'credentials'), { recursive: true });
	await writeFile(join(dir, 'credentials', 'token.bfb'), token);
}

describe('requestActivation', () => {
	test('returns the token from a valid response', async () => {
		mockFetch(json({ token: 'server-token-123' }));
		expect(await requestActivation('input')).toEqual({ status: 'valid', token: 'server-token-123' });
	});

	test('treats the server 500 with {"state":false} as an invalid token, not a server error', async () => {
		mockFetch(json({ state: false }, 500));
		expect(await requestActivation('input')).toEqual({ status: 'invalid' });
	});

	test('rejects a token that is not a safe header value', async () => {
		mockFetch(json({ token: 'bad token\r\nX-Injected: 1' }));
		expect(await requestActivation('input')).toEqual({ status: 'invalid' });
		mockFetch(json({ token: 123 }));
		expect(await requestActivation('input')).toEqual({ status: 'invalid' });
	});

	test('rejects typed input that cannot be sent as a header, without calling the server', async () => {
		mockFetch(json({ token: 'server-token-123' }));
		expect(await requestActivation('tökén')).toEqual({ status: 'invalid' });
		expect(await requestActivation('two words')).toEqual({ status: 'invalid' });
		expect(calls).toBe(0);
	});

	test('reports a server error for a non-JSON body', async () => {
		mockFetch(async () => new Response('<html>Bad Gateway</html>', { status: 502 }));
		expect(await requestActivation('input')).toEqual({ status: 'error' });
	});

	test('reports a server error when the request fails', async () => {
		mockFetch(async () => {
			throw new Error('network down');
		});
		expect(await requestActivation('input')).toEqual({ status: 'error' });
	});
});

describe('checkActivation', () => {
	test('is false without a token file, without calling the server', async () => {
		mockFetch(json({ state: true }));
		expect(await checkActivation()).toBe(false);
		expect(calls).toBe(0);
	});

	test('is true only when the server answers state true', async () => {
		await saveToken('abc');
		mockFetch(json({ state: false }, 500));
		expect(await checkActivation()).toBe(false);
		mockFetch(json({ state: 'yes' }));
		expect(await checkActivation()).toBe(false);
		mockFetch(json({ state: true }));
		expect(await checkActivation()).toBe(true);
	});

	test('caches a positive result for the rest of the session', async () => {
		await saveToken('abc');
		mockFetch(json({ state: true }));
		await checkActivation();
		await checkActivation();
		await checkActivation();
		expect(calls).toBe(1);
	});

	test('gives up instead of hanging when the server does not answer', async () => {
		await saveToken('abc');
		globalThis.fetch = ((_url: string, init?: RequestInit) =>
			new Promise((_resolve, reject) => {
				init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
			})) as unknown as typeof fetch;
		const started = Date.now();
		expect(await checkActivation(50)).toBe(false);
		expect(Date.now() - started).toBeLessThan(2000);
	});
});
