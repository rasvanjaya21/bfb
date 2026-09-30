import { formatAuditLine } from '@/libs/format-audit-line';
import { describe, expect, test } from 'bun:test';

// 2026-10-01 07:03:12 UTC
const date = new Date(Date.UTC(2026, 9, 1, 7, 3, 12));

describe('formatAuditLine', () => {
	test('writes local time with its offset, source, action, result and note', () => {
		const line = formatAuditLine({ date, source: 'MENU 97', action: 'Aktifasi bfb', result: 'gagal', note: 'Token tidak valid' }, 420);
		expect(line).toBe('2026-10-01 14:03:12 +07:00 | MENU 97 | Aktifasi bfb | gagal | Token tidak valid');
	});

	test('leaves out the note separator when there is no note', () => {
		expect(formatAuditLine({ date, source: 'MENU 99', action: 'Keluar', result: 'selesai' }, 420)).toBe('2026-10-01 14:03:12 +07:00 | MENU 99 | Keluar | selesai');
		expect(formatAuditLine({ date, source: 'MENU 99', action: 'Keluar', result: 'selesai', note: '' }, 420)).toBe('2026-10-01 14:03:12 +07:00 | MENU 99 | Keluar | selesai');
	});

	test('pads the source so one and two digit menus line up', () => {
		expect(formatAuditLine({ date, source: 'MENU 1', action: 'Rawat facebook', result: 'mulai' }, 0)).toBe('2026-10-01 07:03:12 +00:00 | MENU 1  | Rawat facebook | mulai');
		expect(formatAuditLine({ date, source: 'SESI', action: 'bfb v0.4.0', result: 'mulai' }, 0)).toBe('2026-10-01 07:03:12 +00:00 | SESI    | bfb v0.4.0 | mulai');
	});

	test('handles negative and half hour offsets, including a date change', () => {
		expect(formatAuditLine({ date, source: 'SESI', action: 'a', result: 'mulai' }, 330)).toStartWith('2026-10-01 12:33:12 +05:30 |');
		expect(formatAuditLine({ date, source: 'SESI', action: 'a', result: 'mulai' }, -480)).toStartWith('2026-09-30 23:03:12 -08:00 |');
		expect(formatAuditLine({ date, source: 'SESI', action: 'a', result: 'mulai' }, -210)).toStartWith('2026-10-01 03:33:12 -03:30 |');
	});

	test('uses the machine time zone when no offset is given', () => {
		const offset = -date.getTimezoneOffset();
		expect(formatAuditLine({ date, source: 'SESI', action: 'a', result: 'mulai' })).toBe(formatAuditLine({ date, source: 'SESI', action: 'a', result: 'mulai' }, offset));
	});

	test('keeps one event on one line with no stray separators', () => {
		const line = formatAuditLine({ date, source: 'MENU 1', action: 'NO 2 | UID 1', result: 'gagal', note: 'Koneksi\ntertutup\r\nlagi | coba|ulang' }, 0);
		expect(line).toBe('2026-10-01 07:03:12 +00:00 | MENU 1  | NO 2 / UID 1 | gagal | Koneksi tertutup lagi / coba / ulang');
		expect(line.split('\n').length).toBe(1);
	});
});
