interface Account {
	NO: string;
	UID: string;
	PASSWORD: string;
}

interface Content {
	NO: string;
	COOKIE: string;
	ROUTE: 'PERSONAL' | 'BM' | '';
	TYPE: 'POST' | 'PHOTO' | 'VIDEO' | '';
	IDFANSPAGE: string;
	PATH: string;
	CAPTION: string;
	TAG: 'YES' | 'NO';
	SCHEDULE: string;
}

export { type Account, type Content };
