import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

async function checkActivation(): Promise<boolean> {
	try {
		const cwd = process.cwd();
		const filePath = path.join(cwd, 'credentials', 'token.bfb');

		try {
			await fs.access(filePath);
		} catch {
			return false;
		}

		const encrypted = (await fs.readFile(filePath, 'utf-8')).trim();
		if (!encrypted) return false;

		const [ivBase64, contentBase64] = encrypted.split(':');
		if (!ivBase64 || !contentBase64) return false;

		const iv = Buffer.from(ivBase64, 'base64');
		const content = Buffer.from(contentBase64, 'base64');

		const key = crypto.createHash('sha256').update('belly-sedang-memancing').digest();

		const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

		let decrypted = decipher.update(content);
		decrypted = Buffer.concat([decrypted, decipher.final()]);

		const token = decrypted.toString('utf-8');
		if (!token) return false;

		const res = await fetch('https://bfb.blackfriday.my.id/api/v1/check', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) return false;

		const json = await res.json();

		if (json?.state === true) return true;

		return false;
	} catch {
		return false;
	}
}

export { checkActivation };
