import { loadRows } from '@/libs/load-rows';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

let dir: string;

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-rows-'));
	await mkdir(join(dir, 'datas'));
	await writeFile(join(dir, 'datas', 'contents.csv'), 'NO;CAPTION\n1;satu\n2;dua\n3;tiga');
	await writeFile(join(dir, 'datas', 'accounts.csv'), 'NO;UID;PASSWORD');
});

afterEach(async () => {
	await rm(dir, { recursive: true, force: true });
});

describe('loadRows', () => {
	test('reads every row of a CSV in the working folder', async () => {
		expect(await loadRows<{ NO: string; CAPTION: string }>(dir, 'contents.csv')).toEqual([
			{ NO: '1', CAPTION: 'satu' },
			{ NO: '2', CAPTION: 'dua' },
			{ NO: '3', CAPTION: 'tiga' },
		]);
	});

	test('keeps only the rows with the given NO values', async () => {
		expect(await loadRows<{ NO: string; CAPTION: string }>(dir, 'contents.csv', [3, 1])).toEqual([
			{ NO: '1', CAPTION: 'satu' },
			{ NO: '3', CAPTION: 'tiga' },
		]);
	});

	test('names the file and every NO that is not in it', async () => {
		await expect(loadRows(dir, 'contents.csv', [2, 999, 120])).rejects.toThrow('NO tidak ditemukan di datas/contents.csv: 999, 120');
		await expect(loadRows(dir, 'accounts.csv', [1])).rejects.toThrow('NO tidak ditemukan di datas/accounts.csv: 1');
	});

	test('returns no rows for a CSV with only its header', async () => {
		expect(await loadRows(dir, 'accounts.csv')).toEqual([]);
	});
});
