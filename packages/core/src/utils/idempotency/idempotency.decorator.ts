import { Command, CommandHandler } from "../../kernel";

import { IdempotencyCache } from "./idempotency.cache";

export class IdempotencyCommandHandlerDecorator implements CommandHandler {

	constructor(private readonly handler: CommandHandler, private readonly cache: IdempotencyCache) { }

	public async execute(command: Command): Promise<void> {
		const requestId = command.params.id;

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
		// TODO: format to API gateway response
		if (requestInProgress) throw new Error("Request already in progress!");

		console.debug("Locking request:", requestId);

		await this.cache.lock(requestId);

		console.debug("Handeling request:", requestId);

		const response = await this.handler.execute(command);

		await this.cache.update(requestId, response);

		return response;
	};
}
