import { ignoreSecrets } from '@/libs/ignore-secrets';
import fs from 'fs/promises';
import path from 'path';

async function writeIfMissing(file: string, content: string, mode?: number): Promise<void> {
	await fs.writeFile(file, content, { encoding: 'utf-8', flag: 'wx', mode }).catch((error: NodeJS.ErrnoException) => {
		if (error.code !== 'EEXIST') throw error;
	});
	if (mode !== undefined) await fs.chmod(file, mode);
}

// datas/ holds account passwords, credentials/ session cookies and logs/ account UIDs, so all three stay readable by the owner only.
async function initProject(): Promise<void> {
	const cwd = process.cwd();
	const datasDir = path.join(cwd, 'datas');
	const credentialsDir = path.join(cwd, 'credentials');
	const logsDir = path.join(cwd, 'logs');

	for (const dir of [datasDir, credentialsDir, logsDir]) {
		await fs.mkdir(dir, { recursive: true, mode: 0o700 });
		await fs.chmod(dir, 0o700);
	}

	await writeIfMissing(path.join(datasDir, 'accounts.csv'), 'NO;UID;PASSWORD', 0o600);
	await writeIfMissing(path.join(datasDir, 'contents.csv'), 'NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE', 0o600);
	await writeIfMissing(path.join(credentialsDir, 'cookies.json'), '{}', 0o600);
	await writeIfMissing(path.join(logsDir, 'audit.log'), '', 0o600);
	await ignoreSecrets(path.join(cwd, '.gitignore'), ['datas', 'credentials', 'logs']);
}

export { initProject };
