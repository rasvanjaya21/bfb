import { applyDelay } from '@/libs/apply-delay';
import { hideQuestion } from '@/libs/hide-question';
import { requestActivation } from '@/libs/request-activation';
import { writeSecretFile } from '@/libs/write-secret-file';
import fs from 'fs/promises';
import path from 'path';

async function showResult(message: string): Promise<void> {
	console.clear();
	console.log(`${message}\n`);
	await applyDelay(1000);
}

async function activateBfb(readToken: () => Promise<string> = () => hideQuestion('Masukkan token: ')): Promise<void> {
	const input = (await readToken()).trim();

	if (!input) return showResult('Token kosong, aktifasi gagal');

	const result = await requestActivation(input);

	if (result.status === 'error') return showResult('Server error, aktifasi gagal');
	if (result.status === 'invalid') return showResult('Token tidak valid, aktifasi gagal');

	try {
		const dirPath = path.join(process.cwd(), 'credentials');
		const filePath = path.join(dirPath, 'token.bfb');
		await fs.mkdir(dirPath, { recursive: true, mode: 0o700 });
		await fs.chmod(dirPath, 0o700);
		await writeSecretFile(filePath, result.token);
	} catch {
		return showResult('Token valid, tapi gagal disimpan');
	}

	return showResult('Token valid, aktifasi berhasil');
}

export { activateBfb };
