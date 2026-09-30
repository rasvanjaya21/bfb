type SetupStatus = { isInitialized: boolean; isDriverInstalled: boolean; isActivated: boolean };

// Menus that drive the browser against real accounts stay locked until the whole setup is done.
const LOCKED_UNTIL_READY: string[] = ['1', '95'];

function isMenuLocked(choice: string, status: SetupStatus): boolean {
	if (!LOCKED_UNTIL_READY.includes(choice)) return false;
	return !(status.isInitialized && status.isDriverInstalled && status.isActivated);
}

export { isMenuLocked, type SetupStatus };
