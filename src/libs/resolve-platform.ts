import os from 'os';

enum BrowserPlatform {
	LINUX = 'linux',
	LINUX_ARM = 'linux_arm',
	MAC = 'mac',
	MAC_ARM = 'mac_arm',
	WIN32 = 'win32',
	WIN64 = 'win64',
}

function resolvePlatform(): BrowserPlatform {
	const platform = os.platform();
	const arch = os.arch();

	if (platform === 'linux') {
		if (arch === 'arm64' || arch === 'arm') {
			return BrowserPlatform.LINUX_ARM;
		}
		return BrowserPlatform.LINUX;
	}

	if (platform === 'darwin') {
		if (arch === 'arm64') {
			return BrowserPlatform.MAC_ARM;
		}
		return BrowserPlatform.MAC;
	}

	if (platform === 'win32') {
		if (arch === 'x64') {
			return BrowserPlatform.WIN64;
		}
		return BrowserPlatform.WIN32;
	}

	throw new Error(`Unsupported platform: ${platform} ${arch}`);
}

export { resolvePlatform };
