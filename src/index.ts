import { showHelp } from '@/commands/help';
import { menu } from '@/commands/menu';
import { showVersion } from '@/commands/version';

async function index(): Promise<void> {
	const args = process.argv.slice(2);
	const knownFlags = new Set(['--version', '--help', '-v', '-h']);

	if (args.includes('version') || args.includes('--version') || args.includes('-v')) {
		showVersion();
		return;
	}

	if (args.includes('help') || args.includes('--help') || args.includes('-h')) {
		showHelp();
		return;
	}

	for (const arg of args) {
		if (!knownFlags.has(arg) && isNaN(Number(arg))) {
			console.log(`Unknown flag: '${arg}'`);
			console.log("Try 'bfb help' for usage information");
			return;
		}
	}

	await menu();
}

index().catch(() => process.exit(1));
