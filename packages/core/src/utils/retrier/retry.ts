/* eslint-disable @typescript-eslint/no-explicit-any */
import { Time } from "./time";

import { RetryConfig } from "./config";

export const retryable =
	(config: RetryConfig) =>
	(_: any, __: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			console.debug("Retry config:", config);

			const { maxRetries, backoffStrategy, decider } = config;

			const initialBackoff = 300;

			let shouldRetry = true;
			let retries = 0;

			while (shouldRetry) {
				try {
					await originalMethod.apply(this, args);
				} catch (error) {
					console.debug("Operation failed with error:", error);

					if (decider.notRetryable(error as Error)) throw error;

					shouldRetry = retries < maxRetries;

					const backoff = backoffStrategy.jitter(retries, initialBackoff);

					console.debug("Retries left:", maxRetries - retries);

					if (!shouldRetry) throw error;

					console.debug("Retrying in:", backoff);

					await Time.delay(backoff);

					retries += 1;
				}
			}
		};
	};
