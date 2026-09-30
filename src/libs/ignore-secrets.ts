import fs from 'fs/promises';

// An existing .gitignore keeps its content; only the given folders it does not cover yet are appended.
async function ignoreSecrets(file: string, folders: string[]): Promise<void> {
	const current = await fs.readFile(file, 'utf-8').catch(() => '');
	const covered = new Set(current.split(/\r?\n/).map((line) => line.trim().replace(/^\//, '').replace(/\/$/, '')));
	const missing = folders.filter((folder) => !covered.has(folder));
	if (missing.length === 0) return;

	const prefix = current && !current.endsWith('\n') ? '\n' : '';
	await fs.writeFile(file, current + prefix + missing.map((folder) => `${folder}/\n`).join(''), 'utf-8');
}

export { ignoreSecrets };
