type AuditResult = 'mulai' | 'berhasil' | 'dilewati' | 'gagal' | 'terkunci' | 'belum tersedia' | 'sudah siap' | 'selesai' | 'dihentikan';
type AuditEntry = { date: Date; source: string; action: string; result: AuditResult; note?: string };

const pad = (value: number): string => String(value).padStart(2, '0');

// One event is always one line, so line breaks become spaces and a | inside a field cannot pass for a separator.
const clean = (text: string): string => text.replace(/\r\n|\r|\n/g, ' ').replace(/\s*\|\s*/g, ' / ');

// offsetMinutes is east of UTC (+420 for UTC+7); it defaults to the machine's time zone at that date.
function formatAuditLine(entry: AuditEntry, offsetMinutes: number = -entry.date.getTimezoneOffset()): string {
	const local = new Date(entry.date.getTime() + offsetMinutes * 60_000);
	const day = `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}`;
	const time = `${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:${pad(local.getUTCSeconds())}`;
	const offset = `${offsetMinutes < 0 ? '-' : '+'}${pad(Math.floor(Math.abs(offsetMinutes) / 60))}:${pad(Math.abs(offsetMinutes) % 60)}`;

	const fields = [`${day} ${time} ${offset}`, clean(entry.source).padEnd(7), clean(entry.action), entry.result];
	if (entry.note) fields.push(clean(entry.note));
	return fields.join(' | ');
}

export { formatAuditLine, type AuditEntry, type AuditResult };
