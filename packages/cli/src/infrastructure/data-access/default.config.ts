import { ExponentialBackoff, RetryConfig } from "@todos/core";

import { HTTPDecider } from "./http.decider";

export const defaultRetryConfig: RetryConfig = {
	maxRetries: Number(process.env.MAX_RETRIES ?? 5),
	decider: new HTTPDecider(),
	backoffStrategy: new ExponentialBackoff(),
};
