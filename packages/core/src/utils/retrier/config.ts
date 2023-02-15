import { BackoffStrategy } from "./backoff";
import { RetryDecider } from "./decider";

export interface RetryConfig {
	maxRetries: number;
	backoffStrategy: BackoffStrategy;
	decider: RetryDecider;
}
