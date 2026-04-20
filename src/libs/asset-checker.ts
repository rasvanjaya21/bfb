import fs from 'fs/promises';

async function assetChecker(path: string): Promise<boolean> {
	try {
		await fs.access(path);
		return true;
	} catch {
		return false;
	}
}

export { assetChecker };
