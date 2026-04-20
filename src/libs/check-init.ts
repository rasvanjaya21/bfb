import fs from 'fs/promises';
import path from 'path';

async function checkInit(): Promise<boolean> {
	const cwd = process.cwd();

	try {
		await fs.access(path.join(cwd, 'datas', 'accounts.csv'));
	} catch {
		return false;
	}

	try {
		await fs.access(path.join(cwd, 'datas', 'contents.csv'));
	} catch {
		return false;
	}

	try {
		await fs.access(path.join(cwd, 'credentials', 'cookies.json'));
	} catch {
		return false;
	}

	return true;
}

export { checkInit };
