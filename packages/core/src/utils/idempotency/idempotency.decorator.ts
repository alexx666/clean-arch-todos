import { Command, CommandHandler } from "../../application";

import { IdempotencyCache } from "./idempotency.cache";

export class IdempotentCommandHandler<C extends Command = Command, O = void> implements CommandHandler<C, O> {

	constructor(private readonly handler: CommandHandler<C, O>, private readonly cache: IdempotencyCache) { }

	public async execute(command: C): Promise<O | undefined> {
		const requestId = command.id;

		console.debug("Received request:", requestId);

		const cachedRequest = await this.cache.get(requestId);

		const NOW = Date.now() / 1000;

		const requestResponded = !!cachedRequest && !!cachedRequest.response;
		const requestInProgress =
			!!cachedRequest &&
			!cachedRequest.response &&
			cachedRequest.timeout > NOW;

		console.debug("Request:", {
			cached: !!cachedRequest,
			responded: requestResponded,
			inProgress: requestInProgress,
		});

		if (requestResponded) return cachedRequest.response;
		if (requestInProgress) throw new Error("Request already in progress!");

		console.debug("Locking request:", requestId);

		await this.cache.lock(requestId);

		console.debug("Handeling request:", requestId);

		const response = await this.handler.execute(command);

		console.debug("Caching response:", response);

		await this.cache.update(requestId, response);

		return response;
	};
}
