import { Mediator } from "../../../../ports";
import { Command, CommandHandler } from "../../../../shared";

export class InMemoryMediator implements Mediator {

	constructor(private readonly handlers: Map<string, any> = new Map()) { }

	public send<C extends Command, Output>(command: C): Promise<Output> {
		if (!this.handlers.has(command.name)) throw new Error(`No handler for command: ${command.name}`);

		const handler = this.handlers.get(command.name) as CommandHandler<C, Promise<Output>>;

		console.log("Dispatching command", command.name, "handling using", handler.constructor.name);

		return handler.execute(command);
	}
}
