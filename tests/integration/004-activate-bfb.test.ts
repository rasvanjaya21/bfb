import { activateBfb } from '@/libs/activate-bfb';
import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const realFetch = globalThis.fetch;
const realCwd = process.cwd();
let dir: string;
let messages: string[];

const respond = (body: string, status = 200) => {
	globalThis.fetch = (async () => new Response(body, { status })) as unknown as typeof fetch;
};
const tokenFile = () => join(dir, 'credentials', 'token.bfb');
const exists = (file: string) =>
	stat(file).then(
		() => true,
		() => false,
	);

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-activate-'));
	process.chdir(dir);
	messages = [];
	spyOn(console, 'clear').mockImplementation(() => {});
	spyOn(console, 'log').mockImplementation((message: string) => void messages.push(message));
});

afterEach(async () => {
	globalThis.fetch = realFetch;
	process.chdir(realCwd);
	await rm(dir, { recursive: true, force: true });
});

describe('activateBfb', () => {
	test('stores the token from the server and reports success', async () => {
		respond(JSON.stringify({ token: 'server-token-123' }));
		await activateBfb(async () => 'typed-token');
		expect(await readFile(tokenFile(), 'utf-8')).toBe('server-token-123');
		expect(messages).toEqual(['Token valid, aktifasi berhasil\n']);
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('stores the token readable by the owner only', async () => {
		respond(JSON.stringify({ token: 'server-token-123' }));
		await activateBfb(async () => 'typed-token');
		expect((await stat(tokenFile())).mode & 0o777).toBe(0o600);
		expect((await stat(join(dir, 'credentials'))).mode & 0o777).toBe(0o700);
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('tightens an existing token file that was readable by others', async () => {
		await mkdir(join(dir, 'credentials'), { recursive: true });
		await writeFile(tokenFile(), 'old-token', { mode: 0o644 });
		respond(JSON.stringify({ token: 'server-token-123' }));
		await activateBfb(async () => 'typed-token');
		expect((await stat(tokenFile())).mode & 0o777).toBe(0o600);
	});

	test('writes nothing for an empty token', async () => {
		await activateBfb(async () => '');
		expect(await exists(tokenFile())).toBe(false);
		expect(messages).toEqual(['Token kosong, aktifasi gagal\n']);
	});

	test('treats input with only spaces as an empty token, without calling the server', async () => {
		let called = false;
		globalThis.fetch = (async () => {
			called = true;
			return new Response('{}');
		}) as unknown as typeof fetch;
		await activateBfb(async () => '   ');
		expect(called).toBe(false);
		expect(messages).toEqual(['Token kosong, aktifasi gagal\n']);
	});

	test('ignores spaces around a typed token', async () => {
		let sent = '';
		globalThis.fetch = (async (_url: string, init?: RequestInit) => {
			sent = new Headers(init?.headers).get('Authorization') ?? '';
			return new Response(JSON.stringify({ token: 'server-token-123' }));
		}) as unknown as typeof fetch;
		await activateBfb(async () => '  typed-token  ');
		expect(sent).toBe('Bearer typed-token');
		expect(messages).toEqual(['Token valid, aktifasi berhasil\n']);
	});

	test('writes nothing for an invalid token (server 500 with state false)', async () => {
		respond(JSON.stringify({ state: false }), 500);
		await activateBfb(async () => 'wrong');
		expect(await exists(tokenFile())).toBe(false);
		expect(messages).toEqual(['Token tidak valid, aktifasi gagal\n']);
	});

	test('reports a valid token that could not be saved', async () => {
		await writeFile(join(dir, 'credentials'), 'not a folder');
		respond(JSON.stringify({ token: 'server-token-123' }));
		await activateBfb(async () => 'typed-token');
		expect(await readFile(join(dir, 'credentials'), 'utf-8')).toBe('not a folder');
		expect(messages).toEqual(['Token valid, tapi gagal disimpan\n']);
	});

	test('reads the token from stdin when no reader is given', async () => {
		respond(JSON.stringify({ token: 'server-token-123' }));
		const done = activateBfb();
		process.stdin.emit('data', 'typed-token\r');
		await done;
		expect(await readFile(tokenFile(), 'utf-8')).toBe('server-token-123');
		expect(messages).toEqual(['Token valid, aktifasi berhasil\n']);
	});

	test('returns every outcome with the message shown on screen, never the token', async () => {
		const cases: [string, () => void, { ok: boolean; message: string }][] = [
			['typed-token', () => respond(JSON.stringify({ token: 'server-token-123' })), { ok: true, message: 'Token valid, aktifasi berhasil' }],
			['', () => {}, { ok: false, message: 'Token kosong, aktifasi gagal' }],
			['wrong-token', () => respond(JSON.stringify({ state: false }), 500), { ok: false, message: 'Token tidak valid, aktifasi gagal' }],
			['typed-token', () => respond('<html>Bad Gateway</html>', 502), { ok: false, message: 'Server error, aktifasi gagal' }],
		];
		for (const [input, setup, expected] of cases) {
			setup();
			const outcome = await activateBfb(async () => input);
			expect(outcome).toEqual(expected);
			expect(JSON.stringify(outcome)).not.toContain('token-123');
			expect(JSON.stringify(outcome)).not.toContain(input || 'never-empty');
		}
	});

	test('returns a failed outcome when a valid token cannot be saved', async () => {
		await writeFile(join(dir, 'credentials'), 'not a folder');
		respond(JSON.stringify({ token: 'server-token-123' }));
		expect(await activateBfb(async () => 'typed-token')).toEqual({ ok: false, message: 'Token valid, tapi gagal disimpan' });
	});

	test('writes nothing when the server fails', async () => {
		respond('<html>Bad Gateway</html>', 502);
		await activateBfb(async () => 'typed-token');
		expect(await exists(tokenFile())).toBe(false);
		expect(messages).toEqual(['Server error, aktifasi gagal\n']);
	});
});
