import type { Content } from '@/types/global';

type ContentStatus = 'supported' | 'in-development' | 'unsupported-route' | 'unsupported-type';

const ROUTES: string[] = ['BM', 'PERSONAL'];
const TYPES: string[] = ['POST', 'FEED', 'REEL', 'STORY'];

// Decided before any cookie is loaded or any page is visited, so unsupported rows never touch an account session.
function contentStatus(content: Content): ContentStatus {
	if (!ROUTES.includes(content.ROUTE)) return 'unsupported-route';
	if (!TYPES.includes(content.TYPE)) return 'unsupported-type';
	if (content.ROUTE === 'PERSONAL' && content.TYPE === 'POST') return 'supported';
	return 'in-development';
}

export { contentStatus, type ContentStatus };
