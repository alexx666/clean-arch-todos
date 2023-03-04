import { Command, CommandHandler } from "../../application";

import { IdempotencyCache } from "./idempotency.cache";

export class IdempotentCommandHandler implements CommandHandler {

	constructor(private readonly handler: CommandHandler, private readonly cache: IdempotencyCache) { }

	public async execute(command: Command): Promise<void> {
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

		await this.handler.execute(command);

		console.debug("Caching response");

		await this.cache.update(requestId, ""); // REVIEW: empty since handlers are return void
	};
}
