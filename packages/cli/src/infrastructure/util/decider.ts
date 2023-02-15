export interface RetryDecider<T extends Error = Error> {
	notRetryable(error: T): boolean;
}
