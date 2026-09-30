import { readCookies } from '@/libs/read-cookies';
import { saveCookies } from '@/libs/save-cookies';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdtemp, readFile, rm, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

let dir: string;
let file: string;

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-cookies-'));
	file = join(dir, 'cookies.json');
});

afterEach(async () => {
	await rm(dir, { recursive: true, force: true });
});

describe('saveCookies', () => {
	test('keeps the cookies of other UIDs', async () => {
		await writeFile(file, JSON.stringify({ a: [{ name: 'a' }] }));
		await saveCookies(file, 'b', [{ name: 'b' }]);
		expect(JSON.parse(await readFile(file, 'utf-8'))).toEqual({ a: [{ name: 'a' }], b: [{ name: 'b' }] });
	});

	test('creates the store when the file does not exist yet', async () => {
		await saveCookies(file, 'a', [{ name: 'a' }]);
		expect(JSON.parse(await readFile(file, 'utf-8'))).toEqual({ a: [{ name: 'a' }] });
	});

	test('treats an empty file as an empty store', async () => {
		await writeFile(file, '');
		await saveCookies(file, 'a', [1]);
		expect(JSON.parse(await readFile(file, 'utf-8'))).toEqual({ a: [1] });
	});

	test('reads a store that starts with a BOM', async () => {
		await writeFile(file, '﻿' + JSON.stringify({ a: [1] }));
		await saveCookies(file, 'b', [2]);
		expect(JSON.parse(await readFile(file, 'utf-8'))).toEqual({ a: [1], b: [2] });
	});

	test('refuses to overwrite a corrupt store', async () => {
		await writeFile(file, '{"a":[1], broken');
		await expect(saveCookies(file, 'b', [2])).rejects.toThrow();
		expect(await readFile(file, 'utf-8')).toBe('{"a":[1], broken');
	});

	test('refuses to overwrite a store whose root is not an object', async () => {
		await writeFile(file, '[1,2]');
		await expect(saveCookies(file, 'b', [2])).rejects.toThrow();
		expect(await readFile(file, 'utf-8')).toBe('[1,2]');
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('tightens an existing store that was readable by others', async () => {
		await writeFile(file, JSON.stringify({ a: [1] }), { mode: 0o644 });
		await saveCookies(file, 'b', [2]);
		expect((await stat(file)).mode & 0o777).toBe(0o600);
	});

	test('keeps entries it does not understand instead of deleting them', async () => {
		await writeFile(file, JSON.stringify({ a: [1], note: 'kept' }));
		await saveCookies(file, 'b', [2]);
		expect(JSON.parse(await readFile(file, 'utf-8'))).toEqual({ a: [1], note: 'kept', b: [2] });
	});

	test('rejects an empty or blank UID instead of saving cookies under an empty key', async () => {
		await expect(saveCookies(file, '', [1])).rejects.toThrow();
		await expect(saveCookies(file, '  ', [1])).rejects.toThrow();
	});

	test('rejects prototype keys as UID', async () => {
		await expect(saveCookies(file, '__proto__', [1])).rejects.toThrow();
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('writes the store readable by the owner only', async () => {
		await saveCookies(file, 'a', [1]);
		expect((await stat(file)).mode & 0o777).toBe(0o600);
	});
});

describe('readCookies', () => {
	test('returns the cookies of a known UID', async () => {
		await writeFile(file, JSON.stringify({ a: [{ name: 'a' }] }));
		expect(await readCookies(file, 'a')).toEqual([{ name: 'a' }]);
	});

	test('returns an empty list for an unknown UID', async () => {
		await writeFile(file, JSON.stringify({ a: [1] }));
		expect(await readCookies(file, 'b')).toEqual([]);
	});

	test('returns an empty list for an empty file', async () => {
		await writeFile(file, '');
		expect(await readCookies(file, 'a')).toEqual([]);
	});

	test('reads a store that starts with a BOM', async () => {
		await writeFile(file, '﻿' + JSON.stringify({ a: [1] }));
		expect(await readCookies(file, 'a')).toEqual([1]);
	});

	test('throws on a corrupt store instead of pretending it is empty', async () => {
		await writeFile(file, '{"a":[1], broken');
		await expect(readCookies(file, 'a')).rejects.toThrow();
	});

	test('throws when the file does not exist', async () => {
		await expect(readCookies(file, 'a')).rejects.toThrow();
	});

	test('does not treat prototype keys as UIDs', async () => {
		await writeFile(file, JSON.stringify({ a: [1] }));
		expect(await readCookies(file, '__proto__')).toEqual([]);
		expect(await readCookies(file, 'constructor')).toEqual([]);
	});
});
