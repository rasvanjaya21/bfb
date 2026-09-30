import fs from 'fs/promises';
import path from 'path';

async function writeIfMissing(file: string, content: string, mode?: number): Promise<void> {
	await fs.writeFile(file, content, { encoding: 'utf-8', flag: 'wx', mode }).catch((error: NodeJS.ErrnoException) => {
		if (error.code !== 'EEXIST') throw error;
	});
	if (mode !== undefined) await fs.chmod(file, mode);
}

// An existing .gitignore keeps its content; only the secret folders it does not cover yet are appended.
async function ignoreSecrets(file: string): Promise<void> {
	const current = await fs.readFile(file, 'utf-8').catch(() => '');
	const covered = new Set(current.split(/\r?\n/).map((line) => line.trim().replace(/^\//, '').replace(/\/$/, '')));
	const missing = ['datas', 'credentials'].filter((folder) => !covered.has(folder));
	if (missing.length === 0) return;

	const prefix = current && !current.endsWith('\n') ? '\n' : '';
	await fs.writeFile(file, current + prefix + missing.map((folder) => `${folder}/\n`).join(''), 'utf-8');
}

// datas/ holds account passwords and credentials/ holds session cookies, so both stay readable by the owner only.
async function initProject(): Promise<void> {
	const cwd = process.cwd();
	const datasDir = path.join(cwd, 'datas');
	const credentialsDir = path.join(cwd, 'credentials');

	for (const dir of [datasDir, credentialsDir]) {
		await fs.mkdir(dir, { recursive: true, mode: 0o700 });
		await fs.chmod(dir, 0o700);
	}

	await writeIfMissing(path.join(datasDir, 'accounts.csv'), 'NO;UID;PASSWORD', 0o600);
	await writeIfMissing(path.join(datasDir, 'contents.csv'), 'NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE', 0o600);
	await writeIfMissing(path.join(credentialsDir, 'cookies.json'), '{}', 0o600);
	await ignoreSecrets(path.join(cwd, '.gitignore'));
}

export { initProject };
