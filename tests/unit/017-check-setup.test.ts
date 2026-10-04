import { checkSetup } from '@/libs/check-setup';
import { describe, expect, test } from 'bun:test';

// Fake checks that record which ones ran.
function checks(init: boolean, driver: boolean, activation: boolean): { ran: string[]; run: Parameters<typeof checkSetup>[0] } {
	const ran: string[] = [];
	return {
		ran,
		run: {
			init: async () => (ran.push('init'), init),
			driver: async () => (ran.push('driver'), driver),
			activation: async () => (ran.push('activation'), activation),
		},
	};
}

describe('checkSetup', () => {
	test('stops at an uninitialised folder without checking the driver or calling the activation API', async () => {
		const { ran, run } = checks(false, true, true);
		expect(await checkSetup(run)).toEqual({ isInitialized: false, isDriverInstalled: false, isActivated: false });
		expect(ran).toEqual(['init']);
	});

	test('stops at a missing driver without calling the activation API', async () => {
		const { ran, run } = checks(true, false, true);
		expect(await checkSetup(run)).toEqual({ isInitialized: true, isDriverInstalled: false, isActivated: false });
		expect(ran).toEqual(['init', 'driver']);
	});

	test('runs every check in order when the folder and driver are ready', async () => {
		const { ran, run } = checks(true, true, false);
		expect(await checkSetup(run)).toEqual({ isInitialized: true, isDriverInstalled: true, isActivated: false });
		expect(ran).toEqual(['init', 'driver', 'activation']);
		expect(await checkSetup(checks(true, true, true).run)).toEqual({ isInitialized: true, isDriverInstalled: true, isActivated: true });
	});
});
