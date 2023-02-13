export interface RetryDecider {
	notRetryable(error: Error): boolean;
}
