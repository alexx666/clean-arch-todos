export interface BackoffStrategy {
	next(retries: number, initialBackoff: number): number;
}
