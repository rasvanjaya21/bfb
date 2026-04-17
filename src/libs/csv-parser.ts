import fs from 'fs/promises';

async function csvToJson<T>(csvPath: string): Promise<T[]> {
	const raw = await fs.readFile(csvPath, 'utf-8');

	const lines = raw
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter(Boolean);

	if (lines.length === 0) return [];

	const parseLine = (line: string): string[] => {
		const result: string[] = [];
		let current = '';
		let inQuotes = false;

		for (let i = 0; i < line.length; i++) {
			const char = line[i];

			if (char === '"') {
				if (inQuotes && line[i + 1] === '"') {
					current += '"';
					i++;
				} else {
					inQuotes = !inQuotes;
				}
			} else if (char === ',' && !inQuotes) {
				result.push(current.trim());
				current = '';
			} else {
				current += char;
			}
		}

		result.push(current.trim());
		return result;
	};

	const headerLine = lines[0];
	if (!headerLine) return [];

	const parsedHeader = parseLine(headerLine).filter(Boolean);
	if (parsedHeader.length === 0) return [];

	const header = parsedHeader as (keyof T)[];
	const rows = lines.slice(1);

	return rows.map((line) => {
		const values = parseLine(line);
		const obj = {} as T;

		header.forEach((key, i) => {
			(obj as any)[key] = values[i] ?? '';
		});

		return obj;
	});
}

export { csvToJson };
