import type { RowOutcome } from '@/libs/run-browser-rows';
import type { AuditLogger } from '@/libs/write-audit-log';

const RESULT_WORDS = { done: 'berhasil', skipped: 'dilewati', failed: 'gagal' } as const;

// label names the row without its secrets, e.g. 'NO 3 UID 100092161240413'.
async function logRowOutcome(log: AuditLogger, label: string, outcome: RowOutcome): Promise<void> {
	await log(label, RESULT_WORDS[outcome.status], outcome.message);
}

export { logRowOutcome };
