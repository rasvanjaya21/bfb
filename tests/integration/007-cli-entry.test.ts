import { describe, expect, test } from 'bun:test';
import { join } from 'path';

const entry = join(import.meta.dir, '..', '..', 'src', 'index.ts');

async function runCli(args: string[]): Promise<{ exitCode: number; stdout: string }> {
	const child = Bun.spawn([process.execPath, entry, ...args], { stdout: 'pipe', stderr: 'pipe', stdin: 'ignore' });
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
});
