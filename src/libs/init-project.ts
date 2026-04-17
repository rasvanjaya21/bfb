import fs from 'fs/promises';
import path from 'path';

async function initProject(): Promise<void> {
	const cwd = process.cwd();

	const accountsDir = path.join(cwd, 'accounts');
	const datasFile = path.join(accountsDir, 'datas.csv');

	await fs.mkdir(accountsDir, { recursive: true });
	try {
		await fs.access(datasFile);
	} catch {
		await fs.writeFile(datasFile, '', 'utf-8');
	}

	const assetsDir = path.join(cwd, 'assets');
	await fs.mkdir(assetsDir, { recursive: true });

	const credentialsDir = path.join(cwd, 'credentials');
	const cookiesFile = path.join(credentialsDir, 'cookies.json');

	await fs.mkdir(credentialsDir, { recursive: true });
	try {
		await fs.access(cookiesFile);
	} catch {
		await fs.writeFile(cookiesFile, '', 'utf-8');
	}
}

export { initProject };
