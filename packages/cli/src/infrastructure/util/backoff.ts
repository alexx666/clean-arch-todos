export interface BackoffStrategy {
	jitter(retries: number, initialBackoff: number): number;
}
