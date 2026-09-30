import { formatAuditLine, type AuditResult } from '@/libs/format-audit-line';
import { ignoreSecrets } from '@/libs/ignore-secrets';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

type AuditLogger = (action: string, result: AuditResult, note?: string) => Promise<void>;
type AuditState = { disabled: boolean };

// Once a write fails the log stays off for the rest of the session, so the operator sees one warning, not one per event.
const session: AuditState = { disabled: false };

// Each event is appended on its own, without buffering, so the last events survive bfb being closed abruptly.
// logs/ holds account UIDs, so it is created readable by the owner only and kept out of git like datas/ and credentials/.
async function appendAuditLine(line: string): Promise<void> {
	const cwd = process.cwd();
	const logsDir = path.join(cwd, 'logs');

	const created = await fs.mkdir(logsDir, { recursive: true, mode: 0o700 });
	if (created) await ignoreSecrets(path.join(cwd, '.gitignore'), ['logs']);
	await fs.appendFile(path.join(logsDir, 'audit.log'), `${line}\n`, { encoding: 'utf-8', mode: 0o600 });
}

// Writing the log never throws: a broken log must not fail the menu or the task it records.
function createAuditLogger(source: string, state: AuditState = session): AuditLogger {
	return async (action, result, note) => {
		if (state.disabled) return;
		try {
			await appendAuditLine(formatAuditLine({ date: new Date(), source, action, result, note }));
		} catch {
			state.disabled = true;
			console.log(chalk.yellow('Log audit gagal ditulis, bfb lanjut tanpa log'));
		}
	};
}

export { createAuditLogger, type AuditLogger, type AuditState };
