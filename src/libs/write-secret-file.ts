import { randomBytes } from 'crypto';
import fs from 'fs/promises';

// Writes a secret so it is never readable by others, not even for a moment: a fresh temp file is created
// 0600 ('wx' fails instead of reusing a leftover), then renamed over the target, which replaces the old
// file and its mode in one step. A crash mid-write leaves the old file intact.
async function writeSecretFile(file: string, content: string): Promise<void> {
	const temp = `${file}.${randomBytes(6).toString('hex')}.tmp`;
	try {
		await fs.writeFile(temp, content, { encoding: 'utf-8', mode: 0o600, flag: 'wx' });
		await fs.rename(temp, file);
	} catch (error) {
		await fs.rm(temp, { force: true });
		throw error;
	}
}

export { writeSecretFile };
