import { writeSecretFile } from '@/libs/write-secret-file';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

let dir: string;

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-secret-'));
});

afterEach(async () => {
	await rm(dir, { recursive: true, force: true });
});

describe('writeSecretFile', () => {
	test('replaces the content of an existing file', async () => {
		await writeFile(join(dir, 'token.bfb'), 'old');
		await writeSecretFile(join(dir, 'token.bfb'), 'new');
		expect(await readFile(join(dir, 'token.bfb'), 'utf-8')).toBe('new');
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('leaves the file readable by the owner only, even if it was 0644', async () => {
		await writeFile(join(dir, 'token.bfb'), 'old', { mode: 0o644 });
		await writeSecretFile(join(dir, 'token.bfb'), 'new');
		expect((await stat(join(dir, 'token.bfb'))).mode & 0o777).toBe(0o600);
	});

	test('leaves no temp file behind and keeps the old file when the write fails', async () => {
		await mkdir(join(dir, 'target'));
		await writeFile(join(dir, 'target', 'keep'), 'x');
		await expect(writeSecretFile(join(dir, 'target'), 'new')).rejects.toThrow();
		expect(await readdir(dir)).toEqual(['target']);
		expect(await readdir(join(dir, 'target'))).toEqual(['keep']);
	});
});
