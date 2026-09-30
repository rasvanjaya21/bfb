import { isReservedKey } from '@/libs/is-reserved-key';
import fs from 'fs/promises';

type Cell = { value: string; quoted: boolean };

// Parses the whole text character by character, so separators and line breaks inside quotes stay part of the cell.
function parseRows(text: string): string[][] {
	const rows: string[][] = [];
	let row: Cell[] = [];
	let cell: Cell = { value: '', quoted: false };
	let inQuotes = false;

	const endCell = () => {
		row.push(cell);
		cell = { value: '', quoted: false };
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
			} else {
				cell.value += char;
			}
		} else if (char === '"') {
			inQuotes = true;
			cell.quoted = true;
		} else if (char === ';') {
			endCell();
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && text[i + 1] === '\n') i++;
			endRow();
		} else {
			cell.value += char;
		}
	}
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
