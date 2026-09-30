import { describeMenu } from '@/libs/describe-menu';
import { describe, expect, test } from 'bun:test';

describe('describeMenu', () => {
	test('names every menu with its number and the label shown on screen', () => {
		expect(describeMenu('0')).toEqual({ source: 'MENU 0', action: 'Init project' });
		expect(describeMenu('1')).toEqual({ source: 'MENU 1', action: 'Rawat facebook' });
		expect(describeMenu('2')).toEqual({ source: 'MENU 2', action: 'Follow instagram' });
		expect(describeMenu('3')).toEqual({ source: 'MENU 3', action: 'Tap tiktok' });
		expect(describeMenu('4')).toEqual({ source: 'MENU 4', action: 'Racun shopee' });
		expect(describeMenu('95')).toEqual({ source: 'MENU 95', action: 'Sinkronisasi cookies' });
		expect(describeMenu('96')).toEqual({ source: 'MENU 96', action: 'Pasang driver' });
		expect(describeMenu('97')).toEqual({ source: 'MENU 97', action: 'Aktifasi bfb' });
		expect(describeMenu('98')).toEqual({ source: 'MENU 98', action: 'Pengaturan' });
		expect(describeMenu('99')).toEqual({ source: 'MENU 99', action: 'Keluar' });
	});

	test('never records what was typed for an invalid choice', () => {
		for (const typed of ['', 'abc', ' 1', '100', 'Pass$123#', '__proto__', 'constructor']) {
			expect(describeMenu(typed)).toEqual({ source: 'MENU ?', action: 'Input tidak valid' });
		}
	});
});
