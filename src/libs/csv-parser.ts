import { isReservedKey } from '@/libs/is-reserved-key';
import fs from 'fs/promises';

type Cell = { value: string; quoted: boolean; closed: boolean };

const emptyCell = (): Cell => ({ value: '', quoted: false, closed: false });

// Parses the whole text character by character, so separators and line breaks inside quotes stay part of the cell.
// A quote opens a quoted cell only at the start of a cell (after optional spaces); anywhere else it is plain text,
// so a caption like `Layar 6" mantap` can never swallow the rest of the file.
function parseRows(text: string): string[][] {
	const rows: string[][] = [];
	let row: Cell[] = [];
	let cell = emptyCell();
	let inQuotes = false;

	const endCell = () => {
		row.push(cell);
		cell = emptyCell();
	};
	const endRow = () => {
		endCell();
		rows.push(row.map((item) => (item.quoted ? item.value : item.value.trim())));
		row = [];
	};

	for (let i = 0; i < text.length; i++) {
		const char = text[i]!;

		if (inQuotes) {
			if (char === '"' && text[i + 1] === '"') {
				cell.value += '"';
				i++;
			} else if (char === '"') {
				inQuotes = false;
				cell.closed = true;
			} else {
				cell.value += char;
			}
		} else if (char === ';') {
			endCell();
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && text[i + 1] === '\n') i++;
			endRow();
		} else if (char === '"' && !cell.quoted && cell.value.trim() === '') {
			inQuotes = true;
			cell.quoted = true;
			cell.value = '';
		} else if (!(cell.closed && char.trim() === '')) {
			cell.value += char;
		}
	}

	if (inQuotes) throw new Error('Format CSV tidak valid: tanda kutip tidak ditutup');
	endRow();

	return rows.filter((cells) => cells.some((value) => value !== ''));
}

async function csvToJson<T>(csvPath: string): Promise<T[]> {
	const raw = await fs.readFile(csvPath, 'utf-8');
	const [header, ...rows] = parseRows(raw.replace(/^\uFEFF/, ''));

	if (!header) return [];

	return rows.map((values) => {
		const obj: Record<string, string> = {};
		header.forEach((key, i) => {
			if (key && !isReservedKey(key)) obj[key] = values[i] ?? '';
		});
		return obj as T;
	});
}

export { csvToJson };
