import type { SetupStatus } from '@/libs/menu-access';

type SetupChecks = { init: () => Promise<boolean>; driver: () => Promise<boolean>; activation: () => Promise<boolean> };

// Runs the setup checks in order and stops at the first one that fails, so a folder that is not initialised never
// looks for the driver and never calls the activation API.
async function checkSetup(checks: SetupChecks): Promise<SetupStatus> {
	const isInitialized = await checks.init();
	const isDriverInstalled = isInitialized && (await checks.driver());
	const isActivated = isDriverInstalled && (await checks.activation());
	return { isInitialized, isDriverInstalled, isActivated };
}

export { checkSetup, type SetupChecks };
