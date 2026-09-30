import { checkInit } from '@/libs/check-init';
import { initProject } from '@/libs/init-project';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const realCwd = process.cwd();
let dir: string;

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-init-'));
	process.chdir(dir);
});

afterEach(async () => {
	process.chdir(realCwd);
	await rm(dir, { recursive: true, force: true });
});

const mode = async (file: string) => (await stat(join(dir, file))).mode & 0o777;

describe('initProject', () => {
	test('makes checkInit pass', async () => {
		expect(await checkInit()).toBe(false);
		await initProject();
		expect(await checkInit()).toBe(true);
	});

	test('checkInit fails again when any required file is removed', async () => {
		await initProject();
		for (const file of ['datas/accounts.csv', 'datas/contents.csv', 'credentials/cookies.json']) {
			await rm(join(dir, file));
			expect(await checkInit()).toBe(false);
			await initProject();
			expect(await checkInit()).toBe(true);
		}
	});

	test('writes the CSV headers and an empty JSON cookie store', async () => {
		await initProject();
		expect(await readFile(join(dir, 'datas', 'accounts.csv'), 'utf-8')).toBe('NO;UID;PASSWORD');
		expect(await readFile(join(dir, 'datas', 'contents.csv'), 'utf-8')).toBe('NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE');
		expect(JSON.parse(await readFile(join(dir, 'credentials', 'cookies.json'), 'utf-8'))).toEqual({});
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('keeps secrets readable by the owner only', async () => {
		await initProject();
		expect(await mode('datas')).toBe(0o700);
		expect(await mode('credentials')).toBe(0o700);
		expect(await mode('datas/accounts.csv')).toBe(0o600);
		expect(await mode('datas/contents.csv')).toBe(0o600);
		expect(await mode('credentials/cookies.json')).toBe(0o600);
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('tightens folders and files that already existed with looser modes', async () => {
		await mkdir(join(dir, 'datas'), { mode: 0o755 });
		await writeFile(join(dir, 'datas', 'accounts.csv'), 'NO;UID;PASSWORD', { mode: 0o644 });
		await initProject();
		expect(await mode('datas')).toBe(0o700);
		expect(await mode('datas/accounts.csv')).toBe(0o600);
	});

	test('adds a .gitignore that keeps secrets out of git', async () => {
		await initProject();
		expect(await readFile(join(dir, '.gitignore'), 'utf-8')).toBe('datas/\ncredentials/\n');
	});

	test('adds the missing secret folders to an existing .gitignore and keeps its content', async () => {
		await writeFile(join(dir, '.gitignore'), 'node_modules\ndatas/');
		await initProject();
		expect(await readFile(join(dir, '.gitignore'), 'utf-8')).toBe('node_modules\ndatas/\ncredentials/\n');
	});

	test('leaves a .gitignore that already covers both folders untouched', async () => {
		await writeFile(join(dir, '.gitignore'), 'credentials\n/datas/\n');
		await initProject();
		expect(await readFile(join(dir, '.gitignore'), 'utf-8')).toBe('credentials\n/datas/\n');
	});

	test('never overwrites existing files', async () => {
		await initProject();
		await writeFile(join(dir, 'datas', 'accounts.csv'), 'NO;UID;PASSWORD\n1;100;secret');
		await writeFile(join(dir, 'datas', 'contents.csv'), 'NO;COOKIE\n1;100');
		await writeFile(join(dir, 'credentials', 'cookies.json'), '{"100":[]}');
		await initProject();
		expect(await readFile(join(dir, 'datas', 'accounts.csv'), 'utf-8')).toBe('NO;UID;PASSWORD\n1;100;secret');
		expect(await readFile(join(dir, 'datas', 'contents.csv'), 'utf-8')).toBe('NO;COOKIE\n1;100');
		expect(await readFile(join(dir, 'credentials', 'cookies.json'), 'utf-8')).toBe('{"100":[]}');
	});
});
