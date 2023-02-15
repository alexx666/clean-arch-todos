/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdempotencyConfig } from "./idempotency.config";

export const idempotent = (config: IdempotencyConfig) => (_: any, __: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	const { cache } = config;

	descriptor.value = async function (...args: any[]) {

		// REVIEW: define location in parameters
		const requestId = args[0].headers["X-Request-Id"];

		console.debug("Received request:", requestId);

		const cachedRequest = await cache.get(requestId);

		const NOW = Date.now() / 1000;

		const requestResponded = !!cachedRequest && !!cachedRequest.response;
		const requestInProgress = !!cachedRequest && !cachedRequest.response && cachedRequest.timeout > NOW;

		console.debug("Request:", { cached: !!cachedRequest, responded: requestResponded, inProgress: requestInProgress });

		if (requestResponded) return cachedRequest.response;
		// TODO: format to API gateway response
		if (requestInProgress) throw new Error("Request already in progress!");

		console.debug("Locking request:", requestId);

		await cache.lock(requestId);

		console.debug("Handeling request:", requestId);

		const response = await originalMethod.apply(this, args);

		await cache.update(requestId, response);

		return response;
	}
};
