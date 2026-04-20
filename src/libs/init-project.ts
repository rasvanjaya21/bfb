import fs from 'fs/promises';
import path from 'path';

async function initProject(): Promise<void> {
	const cwd = process.cwd();
	const datasDir = path.join(cwd, 'datas');
	const credentialsDir = path.join(cwd, 'credentials');

	const accountsFile = path.join(datasDir, 'accounts.csv');
	const contentsFile = path.join(datasDir, 'contents.csv');
	const cookiesFile = path.join(credentialsDir, 'cookies.json');

	await fs.mkdir(datasDir, { recursive: true });
	try {
		await fs.access(accountsFile);
	} catch {
		await fs.writeFile(accountsFile, 'NO,UID,PASSWORD', 'utf-8');
	}

	await fs.mkdir(datasDir, { recursive: true });
	try {
		await fs.access(contentsFile);
	} catch {
		await fs.writeFile(contentsFile, 'NO,COOKIE,IDFANSPAGE,PATH,CAPTION', 'utf-8');
	}

	await fs.mkdir(credentialsDir, { recursive: true });
	try {
		await fs.access(cookiesFile);
	} catch {
		await fs.writeFile(cookiesFile, '', 'utf-8');
	}
}

export { initProject };
