import { selectRows } from '@/libs/select-rows';
import { describe, expect, test } from 'bun:test';

const rows = [{ NO: '1' }, { NO: '2' }, { NO: '07' }, { NO: '10' }];

describe('selectRows', () => {
	test('keeps every row when no NO is given', () => {
		expect(selectRows(rows)).toEqual({ rows, missing: [] });
	});

	test('keeps only the given NO values, in CSV order', () => {
		expect(selectRows(rows, [10, 1])).toEqual({ rows: [{ NO: '1' }, { NO: '10' }], missing: [] });
	});

	test('compares NO as a number', () => {
		expect(selectRows(rows, [7]).rows).toEqual([{ NO: '07' }]);
	});

	test('reports NO values that are not in the CSV, in the order they were given', () => {
		expect(selectRows(rows, [99, 2, 3])).toEqual({ rows: [{ NO: '2' }], missing: [99, 3] });
	});
});
