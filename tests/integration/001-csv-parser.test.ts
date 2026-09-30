import { csvToJson } from '@/libs/csv-parser';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

let dir: string;

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-csv-'));
});

afterEach(async () => {
	await rm(dir, { recursive: true, force: true });
});

async function parse(text: string): Promise<Record<string, string>[]> {
	const file = join(dir, 'data.csv');
	await writeFile(file, text);
	return csvToJson<Record<string, string>>(file);
}

describe('csvToJson', () => {
	test('parses the accounts header used by initProject', async () => {
		expect(await parse('NO;UID;PASSWORD\n1;100;secret')).toEqual([{ NO: '1', UID: '100', PASSWORD: 'secret' }]);
	});

	test('keeps a semicolon inside quotes', async () => {
		expect(await parse('NO;CAPTION\n1;"a;b"')).toEqual([{ NO: '1', CAPTION: 'a;b' }]);
	});

	test('keeps a line break inside a quoted caption', async () => {
		expect(await parse('NO;CAPTION\n1;"line1\nline2"\n2;x')).toEqual([
			{ NO: '1', CAPTION: 'line1\nline2' },
			{ NO: '2', CAPTION: 'x' },
		]);
	});

	test('unescapes doubled quotes', async () => {
		expect(await parse('NO;CAPTION\n1;"say ""hi"""')).toEqual([{ NO: '1', CAPTION: 'say "hi"' }]);
	});

	test('keeps spaces inside quotes and trims unquoted cells', async () => {
		expect(await parse('NO;CAPTION\n 1 ;"  padded  "')).toEqual([{ NO: '1', CAPTION: '  padded  ' }]);
	});

	test('handles CRLF line endings and a BOM', async () => {
		expect(await parse('﻿NO;UID\r\n1;100\r\n')).toEqual([{ NO: '1', UID: '100' }]);
	});

	test('handles a BOM before a quoted first header', async () => {
		expect(await parse('\uFEFF"NO";UID\n1;100')).toEqual([{ NO: '1', UID: '100' }]);
	});

	test('fills missing trailing cells with an empty string', async () => {
		expect(await parse('NO;UID;PASSWORD\n1;100')).toEqual([{ NO: '1', UID: '100', PASSWORD: '' }]);
	});

	test('does not shift columns after an empty header cell', async () => {
		expect(await parse('NO;;UID\n1;skip;100')).toEqual([{ NO: '1', UID: '100' }]);
	});

	test('skips blank and separator-only rows', async () => {
		expect(await parse('NO;UID\n\n;;\n1;100\n')).toEqual([{ NO: '1', UID: '100' }]);
	});

	test('returns no rows for a header-only file or an empty file', async () => {
		expect(await parse('NO;UID;PASSWORD')).toEqual([]);
		expect(await parse('')).toEqual([]);
	});

	test('ignores prototype keys used as headers', async () => {
		const [row] = await parse('NO;__proto__;constructor\n1;x;y');
		expect(row).toEqual({ NO: '1' });
		expect(Object.getPrototypeOf(row)).toBe(Object.prototype);
	});
});
