// The menu as shown on screen, in order. A Map, so typed keys such as __proto__ never match a menu.
const MENU_LABELS: ReadonlyMap<string, string> = new Map([
	['0', 'Init project'],
	['1', 'Rawat facebook'],
	['2', 'Follow instagram'],
	['3', 'Tap tiktok'],
	['4', 'Racun shopee'],
	['95', 'Sinkronisasi cookies'],
	['96', 'Pasang driver'],
	['97', 'Aktifasi bfb'],
	['98', 'Pengaturan'],
	['99', 'Keluar'],
]);

// An invalid choice is never echoed into the log: the operator may have typed a password into the wrong prompt.
function describeMenu(choice: string): { source: string; action: string } {
	const label = MENU_LABELS.get(choice);
	if (label === undefined) return { source: 'MENU ?', action: 'Input tidak valid' };
	return { source: `MENU ${choice}`, action: label };
}

export { MENU_LABELS, describeMenu };
