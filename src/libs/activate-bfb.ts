import { applyDelay } from '@/libs/apply-delay';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline/promises';

async function activateBfb(readlineInterface: readline.Interface): Promise<void> {
	try {
		const token = await readlineInterface.question('Masukkan token: ');

		if (!token) {
			readlineInterface.pause();
			console.clear();
			console.log('Token kosong, aktifasi gagal\n');
			await applyDelay(1000);
			readlineInterface.resume();
			return;
		}

		const res = await fetch('https://bfb.blackfriday.my.id/api/v1/check', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			readlineInterface.pause();
			console.clear();
			console.log('Response error, aktifasi gagal\n');
			await applyDelay(1000);
			readlineInterface.resume();
			return;
		}

		const json = await res.json();

		if (json?.state !== true) {
			readlineInterface.pause();
			console.clear();
			console.log('Token tidak valid, aktifasi gagal\n');
			await applyDelay(1000);
			readlineInterface.resume();
			return;
		}

		const iv = crypto.randomBytes(16);

		const key = crypto.createHash('sha256').update('belly-sedang-memancing').digest();

		const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

		let encrypted = cipher.update(token);
		encrypted = Buffer.concat([encrypted, cipher.final()]);

		const payload = `${iv.toString('base64')}:${encrypted.toString('base64')}`;

		const cwd = process.cwd();
		const dirPath = path.join(cwd, 'credentials');
		const filePath = path.join(dirPath, 'token.bfb');

		await fs.mkdir(dirPath, { recursive: true });

		await fs.writeFile(filePath, payload, 'utf-8');

		readlineInterface.pause();
		console.clear();
		console.log('Token valid, aktifasi berhasil\n');
		await applyDelay(1000);
		readlineInterface.resume();
		return;
	} catch {
		readlineInterface.pause();
		console.clear();
		console.log('Server error, aktifasi gagal\n');
		await applyDelay(1000);
		readlineInterface.resume();
		return;
	}
}

export { activateBfb };
