type ParsedArgs = { command: 'menu' | 'version' | 'help' } | { command: 'unknown'; flag: string };

const VERSION_ARGS: string[] = ['version', '--version', '-v'];
const HELP_ARGS: string[] = ['help', '--help', '-h'];

function parseArgs(args: string[]): ParsedArgs {
	if (args.some((arg) => VERSION_ARGS.includes(arg))) return { command: 'version' };
	if (args.some((arg) => HELP_ARGS.includes(arg))) return { command: 'help' };

	const unknown = args[0];
	if (unknown !== undefined) return { command: 'unknown', flag: unknown };

	return { command: 'menu' };
}

export { parseArgs, type ParsedArgs };
