import { logRowOutcome } from '@/libs/log-row-outcome';
import { describe, expect, test } from 'bun:test';

describe('logRowOutcome', () => {
	test('records each row outcome with the result word used in the audit log', async () => {
		const entries: unknown[][] = [];
		const log = async (...entry: unknown[]) => void entries.push(entry);
		await logRowOutcome(log, 'NO 1 UID 100', { status: 'done' });
		await logRowOutcome(log, 'NO 2 UID 200', { status: 'skipped', message: 'Masih dalam tahap pengembangan' });
		await logRowOutcome(log, 'NO 3 UID 300', { status: 'failed', message: 'Cookie tidak valid' });
		expect(entries).toEqual([
			['NO 1 UID 100', 'berhasil', undefined],
			['NO 2 UID 200', 'dilewati', 'Masih dalam tahap pengembangan'],
			['NO 3 UID 300', 'gagal', 'Cookie tidak valid'],
		]);
	});
});
