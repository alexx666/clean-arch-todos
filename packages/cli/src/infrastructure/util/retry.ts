import { Time } from "./time";
import { ExponentialBackoff } from "./exponential.backoff";
import { HTTPDecider } from "./http.decider";
import { RetryConfig } from "./config";

const defaultRetryConfig: RetryConfig = {
	maxRetries: Number(process.env.MAX_RETRIES ?? 5),
	decider: new HTTPDecider(),
	backoffStrategy: new ExponentialBackoff(),
};

export const retryable = (config: RetryConfig = defaultRetryConfig) => (_: any, __: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {

		console.debug("Retry config:", config);

		const { maxRetries, backoffStrategy, decider } = config;

		const initialBackoff = 300;

		let shouldRetry = true;
		let retries = 0;

		do {
			try {
				await originalMethod.apply(this, args);
			} catch (error) {
				console.debug("Operation failed with error:", error);

				if (decider.notRetryable(error as Error)) throw error;

				retries += 1;
				shouldRetry = retries < maxRetries;

				const backoff = backoffStrategy.jitter(retries, initialBackoff);

				console.debug("Retrying in:", backoff)

				await Time.delay(backoff);

				console.debug("Retries left:", maxRetries - retries);
			}
		} while (shouldRetry);
	}
}
