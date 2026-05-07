import { applyDelay } from '@/libs/apply-delay';
import { hideQuestion } from '@/libs/hide-question';
import fs from 'fs/promises';
import path from 'path';

const BACKEND_URL_API = 'https://bfb.blackfriday.my.id/api/v1/check';

async function activateBfb(): Promise<void> {
	try {
		const token = await hideQuestion('Masukkan token: ');

		if (!token) {
			console.clear();
			console.log('Token kosong, aktifasi gagal\n');
			await applyDelay(1000);
			return;
		}

		const response = await fetch(BACKEND_URL_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = (await response.json()) as { token: string };

		if (!data.token) {
			console.clear();
			console.log('Token tidak valid, aktifasi gagal\n');
			await applyDelay(1000);
			return;
		}

		const cwd = process.cwd();
		const dirPath = path.join(cwd, 'credentials');
		const filePath = path.join(dirPath, 'token.bfb');

		await fs.mkdir(dirPath, { recursive: true });

		await fs.writeFile(filePath, data.token, 'utf-8');

		console.clear();
		console.log('Token valid, aktifasi berhasil\n');
		await applyDelay(1000);
		return;
	} catch {
		console.clear();
		console.log('Server error, aktifasi gagal\n');
		await applyDelay(1000);
		return;
	}
}

export { activateBfb };
