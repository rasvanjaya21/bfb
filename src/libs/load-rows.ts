import { csvToJson } from '@/libs/csv-parser';
import { selectRows } from '@/libs/select-rows';
import path from 'path';

// Reads datas/<file> in the working folder and keeps the rows with the explicit NO values (all rows without them).
// A NO that is not in the file stops the run here, before the browser opens.
async function loadRows<T extends { NO: string }>(cwd: string, file: string, explicit?: number[]): Promise<T[]> {
	const { rows, missing } = selectRows(await csvToJson<T>(path.join(cwd, 'datas', file)), explicit);
	if (missing.length > 0) throw new Error(`NO tidak ditemukan di datas/${file}: ${missing.join(', ')}`);
	return rows;
}

export { loadRows };
