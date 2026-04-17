import fs from 'fs/promises';
import path from 'path';

async function checkInit(): Promise<boolean> {
	const cwd = process.cwd();

	try {
		await fs.access(path.join(cwd, 'accounts', 'datas.csv'));
	} catch {
		return false;
	}

	try {
		const stat = await fs.stat(path.join(cwd, 'assets'));
		if (!stat.isDirectory()) return false;
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
