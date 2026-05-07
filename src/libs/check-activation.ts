import fs from 'fs/promises';
import path from 'path';

const BACKEND_URL_API = 'https://bfb.blackfriday.my.id/api/v1/check';

async function checkActivation(): Promise<boolean> {
	try {
		const cwd = process.cwd();
		const filePath = path.join(cwd, 'credentials', 'token.bfb');

		try {
			await fs.access(filePath);
		} catch {
			return false;
		}

		const token = (await fs.readFile(filePath, 'utf-8')).trim();
		if (!token) return false;

		const response = await fetch(BACKEND_URL_API, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = (await response.json()) as { state: boolean };

		if (!data.state) return false;

		return true;
	} catch {
		return false;
	}
}

export { checkActivation };
