import { applyDelay } from '@/libs/apply-delay';
import { hideQuestion } from '@/libs/hide-question';
import { requestActivation } from '@/libs/request-activation';
import { writeSecretFile } from '@/libs/write-secret-file';
import type { Outcome } from '@/types/global';
import fs from 'fs/promises';
import path from 'path';

async function showResult(ok: boolean, message: string): Promise<Outcome> {
	console.clear();
	console.log(`${message}\n`);
	await applyDelay(1000);
	return { ok, message };
}

async function activateBfb(readToken: () => Promise<string> = () => hideQuestion('Masukkan token: ')): Promise<Outcome> {
	const input = (await readToken()).trim();

	if (!input) return showResult(false, 'Token kosong, aktifasi gagal');

	const result = await requestActivation(input);

	if (result.status === 'error') return showResult(false, 'Server error, aktifasi gagal');
	if (result.status === 'invalid') return showResult(false, 'Token tidak valid, aktifasi gagal');

	try {
		const dirPath = path.join(process.cwd(), 'credentials');
		const filePath = path.join(dirPath, 'token.bfb');
		await fs.mkdir(dirPath, { recursive: true, mode: 0o700 });
		await fs.chmod(dirPath, 0o700);
		await writeSecretFile(filePath, result.token);
	} catch {
		return showResult(false, 'Token valid, tapi gagal disimpan');
	}

	return showResult(true, 'Token valid, aktifasi berhasil');
}

export { activateBfb };
