import { contentStatus } from '@/libs/content-status';
import type { Content } from '@/types/global';
import { describe, expect, test } from 'bun:test';

const row = (overrides: Partial<Content> = {}): Content => ({ NO: '1', COOKIE: 'a', ROUTE: 'PERSONAL', TYPE: 'POST', IDFANSPAGE: '', PATH: '', CAPTION: 'hi', TAG: 'NO', SCHEDULE: '', ...overrides });

describe('contentStatus', () => {
	test('supports only PERSONAL POST for now', () => {
		expect(contentStatus(row())).toBe('supported');
		expect(contentStatus(row({ ROUTE: 'BM', TYPE: 'POST' }))).toBe('in-development');
		expect(contentStatus(row({ TYPE: 'REEL' }))).toBe('in-development');
	});

	test('rejects an empty or unknown route or type', () => {
		expect(contentStatus(row({ ROUTE: '' as Content['ROUTE'] }))).toBe('unsupported-route');
		expect(contentStatus(row({ ROUTE: 'GROUP' as Content['ROUTE'] }))).toBe('unsupported-route');
		expect(contentStatus(row({ TYPE: 'LIVE' as Content['TYPE'] }))).toBe('unsupported-type');
	});
});
