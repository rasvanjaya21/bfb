import { MENU_LABELS } from '@/libs/describe-menu';
import { describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const entry = join(import.meta.dir, '..', '..', 'src', 'index.ts');

async function runCli(args: string[], cwd?: string, env?: Record<string, string>): Promise<{ exitCode: number; stdout: string }> {
	const child = Bun.spawn([process.execPath, entry, ...args], { cwd, env: { ...process.env, ...env }, stdout: 'pipe', stderr: 'pipe', stdin: 'ignore' });
	const stdout = await new Response(child.stdout).text();
	return { exitCode: await child.exited, stdout };
}

describe('cli entry', () => {
	test('exits with 1 on an unknown flag and names the flag', async () => {
		const result = await runCli(['--salah']);
		expect(result.exitCode).toBe(1);
		expect(result.stdout).toContain("Flag tidak dikenal: '--salah'");
	});

	test('exits with 0 for version and help', async () => {
		expect((await runCli(['-v'])).exitCode).toBe(0);
		expect((await runCli(['help'])).exitCode).toBe(0);
	});

	test('help is a usage guide for every command, menu, and bypass example', async () => {
		for (const args of [['help'], ['--help'], ['-h']]) {
			const result = await runCli(args);
			expect(result.exitCode).toBe(0);
			for (const text of ['bfb -b <menu>', '--bypass', '--explicit', 'bfb -b 95 -e 1', 'bfb -b 1 -e 2,3,1,99,21', '95. Sinkronisasi cookies', ' 1. Rawat facebook', 'datas/contents.csv', 'datas/accounts.csv', 'logs/audit.log', '(y/N)']) {
				expect(result.stdout).toContain(text);
			}
			expect(result.stdout).not.toContain('bun run');
			for (const [number, label] of MENU_LABELS) expect(result.stdout).toContain(`${number.padStart(2)}. ${label}`);
			expect(result.stdout).toContain('0 (init project), 96 (pasang driver), 97 (aktifasi bfb)');
		}
	});

	test('exits with 1 and explains invalid bypass arguments', async () => {
		for (const [args, message] of [
			[['-e', '2'], '-e/--explicit butuh -b/--bypass'],
			[['-b'], '-b/--bypass butuh nomor menu (1 atau 95)'],
			[['-b', '2'], 'Menu 2 tidak bisa di-bypass, pilih 1 atau 95'],
		] as const) {
			const result = await runCli([...args]);
			expect(result.exitCode).toBe(1);
			expect(result.stdout).toContain(message);
			expect(result.stdout).toContain("Coba 'bfb help' untuk panduan pemakaian");
		}
	});

	test('bypass in a folder that is not set up stops as locked, exits with 1 and logs it', async () => {
		const cwd = await mkdtemp(join(tmpdir(), 'bfb-bypass-'));
		try {
			const result = await runCli(['-b', '1', '-e', '2'], cwd);
			expect(result.exitCode).toBe(1);
			expect(result.stdout).toContain('Fitur masih terkunci, setup terlebih dahulu');
			const audit = await readFile(join(cwd, 'logs', 'audit.log'), 'utf8');
			expect(audit).toContain('| SESI    |');
			expect(audit).toMatch(/\| MENU 1 +\| Rawat facebook \| terkunci \| Fitur masih terkunci, setup terlebih dahulu/);
			expect(audit).toMatch(/\| SESI +\| bfb v[\d.]+ \| selesai/);
			expect(audit.indexOf('| mulai |')).toBeLessThan(audit.indexOf('| terkunci |'));
		} finally {
			await rm(cwd, { recursive: true, force: true });
		}
	});

	test('bypass 95 in a set-up folder without the driver stops as locked and exits with 1', async () => {
		const cwd = await mkdtemp(join(tmpdir(), 'bfb-bypass-'));
		const home = await mkdtemp(join(tmpdir(), 'bfb-home-'));
		try {
			await mkdir(join(cwd, 'datas'));
			await mkdir(join(cwd, 'credentials'));
			await writeFile(join(cwd, 'datas', 'accounts.csv'), 'NO;UID;PASSWORD\n1;100;rahasia');
			await writeFile(join(cwd, 'datas', 'contents.csv'), 'NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE');
			await writeFile(join(cwd, 'credentials', 'cookies.json'), '{}');
			const result = await runCli(['-b', '95', '-e', '1'], cwd, { HOME: home });
			expect(result.exitCode).toBe(1);
			expect(result.stdout).toContain('Fitur masih terkunci, setup terlebih dahulu');
			const audit = await readFile(join(cwd, 'logs', 'audit.log'), 'utf8');
			expect(audit).toMatch(/\| MENU 95 \| Sinkronisasi cookies \| terkunci/);
		} finally {
			await rm(cwd, { recursive: true, force: true });
			await rm(home, { recursive: true, force: true });
		}
	});
});
