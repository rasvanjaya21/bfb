type BypassMenu = '1' | '95';
type ParsedArgs = { command: 'menu' | 'version' | 'help' } | { command: 'unknown'; flag: string } | { command: 'bypass'; menu: BypassMenu; explicit?: number[] } | { command: 'invalid'; message: string };

const VERSION_ARGS: string[] = ['version', '--version', '-v'];
const HELP_ARGS: string[] = ['help', '--help', '-h'];
const BYPASS_ARGS: string[] = ['-b', '--bypass'];
const EXPLICIT_ARGS: string[] = ['-e', '--explicit'];
const BYPASS_MENUS: string[] = ['1', '95'];

const EXPLICIT_VALUE_MESSAGE = '-e/--explicit butuh NO berupa angka positif, contoh: -e 2,3';

function parseArgs(args: string[]): ParsedArgs {
	if (args.some((arg) => VERSION_ARGS.includes(arg))) return { command: 'version' };
	if (args.some((arg) => HELP_ARGS.includes(arg))) return { command: 'help' };
	if (args.length === 0) return { command: 'menu' };

	let menu: string | undefined;
	let explicit: number[] | undefined;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]!;
		// A value that starts with '-' is the next flag, not this flag's value.
		const value = args[i + 1]?.startsWith('-') ? undefined : args[i + 1];

		if (BYPASS_ARGS.includes(arg)) {
			if (menu !== undefined) return { command: 'invalid', message: 'Flag -b/--bypass ditulis lebih dari sekali' };
			if (value === undefined) return { command: 'invalid', message: '-b/--bypass butuh nomor menu (1 atau 95)' };
			if (!BYPASS_MENUS.includes(value)) return { command: 'invalid', message: `Menu ${value} tidak bisa di-bypass, pilih 1 atau 95` };
			menu = value;
			i++;
		} else if (EXPLICIT_ARGS.includes(arg)) {
			if (explicit !== undefined) return { command: 'invalid', message: 'Flag -e/--explicit ditulis lebih dari sekali' };
			const numbers = value?.split(',');
			if (!numbers?.every((number) => /^[1-9]\d*$/.test(number))) return { command: 'invalid', message: EXPLICIT_VALUE_MESSAGE };
			explicit = [...new Set(numbers.map(Number))];
			i++;
		} else {
			return { command: 'unknown', flag: arg };
		}
	}

	if (menu === undefined) return { command: 'invalid', message: '-e/--explicit butuh -b/--bypass' };
	return explicit ? { command: 'bypass', menu: menu as BypassMenu, explicit } : { command: 'bypass', menu: menu as BypassMenu };
}

export { parseArgs, type BypassMenu, type ParsedArgs };
