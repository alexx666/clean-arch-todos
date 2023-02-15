/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CacheEntry {
	id: string;
	response: any;
	timeout: number;
	expiration: number;
}

export interface IdempotencyCache {
	get(id: string): Promise<CacheEntry | undefined>;
	lock(id: string): Promise<void>;
	update(id: string, item: any): Promise<void>;
}
