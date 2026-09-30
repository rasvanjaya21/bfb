import { isMenuLocked } from '@/libs/menu-access';
import { describe, expect, test } from 'bun:test';

const ready = { isInitialized: true, isDriverInstalled: true, isActivated: true };

describe('isMenuLocked', () => {
	test('opens posting and cookie sync only when init, driver and activation are all ready', () => {
		for (const choice of ['1', '95']) {
			expect(isMenuLocked(choice, ready)).toBe(false);
			expect(isMenuLocked(choice, { ...ready, isInitialized: false })).toBe(true);
			expect(isMenuLocked(choice, { ...ready, isDriverInstalled: false })).toBe(true);
			expect(isMenuLocked(choice, { ...ready, isActivated: false })).toBe(true);
		}
	});

	test('never locks the setup menus', () => {
		const nothing = { isInitialized: false, isDriverInstalled: false, isActivated: false };
		for (const choice of ['0', '96', '97', '98', '99']) expect(isMenuLocked(choice, nothing)).toBe(false);
	});
});
