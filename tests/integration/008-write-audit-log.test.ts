import { createAuditLogger } from '@/libs/write-audit-log';
import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const realCwd = process.cwd();
let dir: string;
let warnings: string[];

const auditFile = () => join(dir, 'logs', 'audit.log');
const lines = async () => (await readFile(auditFile(), 'utf-8')).split('\n').filter(Boolean);

beforeEach(async () => {
	dir = await mkdtemp(join(tmpdir(), 'bfb-audit-'));
	process.chdir(dir);
	warnings = [];
	spyOn(console, 'log').mockImplementation((message: string) => void warnings.push(message));
});

afterEach(async () => {
	process.chdir(realCwd);
	await rm(dir, { recursive: true, force: true });
});

describe('createAuditLogger', () => {
	test('creates logs/audit.log on the first event, even in a folder that was never initialized', async () => {
		await createAuditLogger('MENU 97', { disabled: false })('Aktifasi bfb', 'gagal', 'Token tidak valid');
		const written = await lines();
		expect(written.length).toBe(1);
		expect(written[0]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{2}:\d{2} \| MENU 97 \| Aktifasi bfb \| gagal \| Token tidak valid$/);
	});

	// Windows has no POSIX file modes.
	test.skipIf(process.platform === 'win32')('keeps the log readable by the owner only', async () => {
		await createAuditLogger('SESI', { disabled: false })('bfb v0.4.0', 'mulai');
		expect((await stat(join(dir, 'logs'))).mode & 0o777).toBe(0o700);
		expect((await stat(auditFile())).mode & 0o777).toBe(0o600);
	});

	test('appends every event and never rewrites earlier ones', async () => {
		const state = { disabled: false };
		await createAuditLogger('MENU 1', state)('Rawat facebook', 'mulai', '2 baris');
		await createAuditLogger('MENU 1', state)('NO 1 UID 100', 'berhasil');
		await createAuditLogger('MENU 1', state)('NO 2 UID 200', 'gagal', 'Cookie tidak valid');
		const written = await lines();
		expect(written.map((line) => line.split(' | ').slice(1).join(' | '))).toEqual(['MENU 1  | Rawat facebook | mulai | 2 baris', 'MENU 1  | NO 1 UID 100 | berhasil', 'MENU 1  | NO 2 UID 200 | gagal | Cookie tidak valid']);
	});

	test('adds logs/ to the .gitignore of the folder when it creates the log', async () => {
		await writeFile(join(dir, '.gitignore'), 'datas/\ncredentials/\n');
		await createAuditLogger('SESI', { disabled: false })('bfb v0.4.0', 'mulai');
		expect(await readFile(join(dir, '.gitignore'), 'utf-8')).toBe('datas/\ncredentials/\nlogs/\n');
	});

	test('leaves .gitignore alone when logs/ already exists', async () => {
		await mkdir(join(dir, 'logs'));
		await writeFile(join(dir, '.gitignore'), 'datas/\n');
		await createAuditLogger('SESI', { disabled: false })('bfb v0.4.0', 'mulai');
		expect(await readFile(join(dir, '.gitignore'), 'utf-8')).toBe('datas/\n');
	});

	test('never throws when the log cannot be written, warns once, and stops trying', async () => {
		await writeFile(join(dir, 'logs'), 'not a folder');
		const state = { disabled: false };
		const log = createAuditLogger('MENU 1', state);
		await log('Rawat facebook', 'mulai');
		await log('NO 1 UID 100', 'berhasil');
		expect(state.disabled).toBe(true);
		expect(warnings).toEqual(['Log audit gagal ditulis, bfb lanjut tanpa log']);
		expect(await readFile(join(dir, 'logs'), 'utf-8')).toBe('not a folder');
	});

	test('writes nothing once logging was disabled earlier in the session', async () => {
		await createAuditLogger('SESI', { disabled: true })('bfb v0.4.0', 'mulai');
		expect(await stat(join(dir, 'logs')).catch(() => null)).toBeNull();
		expect(warnings).toEqual([]);
	});

	test('shares one session state by default', async () => {
		await writeFile(join(dir, 'logs'), 'not a folder');
		await createAuditLogger('MENU 1')('Rawat facebook', 'mulai');
		await rm(join(dir, 'logs'));
		await createAuditLogger('MENU 95')('Sinkronisasi cookies', 'mulai');
		expect(await stat(join(dir, 'logs')).catch(() => null)).toBeNull();
		expect(warnings.length).toBe(1);
	});
});
