import { Command, CommandHandler } from "../../application";
import { RetryConfig } from "./config";
import { Time } from "./time";

export class RetriableCommandHandler<C extends Command = Command, O = void> implements CommandHandler<C, O> {

	constructor(private readonly handler: CommandHandler<C, O>, private readonly config: RetryConfig) { }

	public async execute(command: C) {
		const { maxRetries, backoffStrategy, decider } = this.config;

		console.debug("Retry config:", { maxRetries });

		const initialBackoff = 300;

		let shouldRetry = true;
		let retries = 0;

		while (shouldRetry) {
			try {
				return await this.handler.execute(command);
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
	}
}
