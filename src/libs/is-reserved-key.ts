const RESERVED_KEYS: string[] = ['__proto__', 'constructor', 'prototype'];

function isReservedKey(key: string): boolean {
	return RESERVED_KEYS.includes(key);
}

export { isReservedKey };
