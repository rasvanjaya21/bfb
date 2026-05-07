interface Account {
	NO: string;
	UID: string;
	PASSWORD: string;
}

interface Content {
	NO: string;
	COOKIE: string;
	ROUTE: 'BM' | 'PERSONAL'; // DEFAULT TO 'PERSONAL'
	TYPE: 'POST' | 'FEED' | 'STORY' | 'REEL'; // DEFAULT TO 'POST'
	IDFANSPAGE: string;
	PATH: string;
	CAPTION: string;
	TAG: 'YES' | 'NO'; // DEFAULT TO 'NO'
	SCHEDULE: string;
}

export { type Account, type Content };
