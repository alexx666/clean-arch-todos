import { Command, CommandHandler } from "../kernel";

export interface IMediator {
	send<Output>(command: Command): Promise<Output | void>;
}

export class Mediator implements IMediator {
	constructor(private readonly handlers: Map<string, any> = new Map()) {}

	public send<C extends Command, Output>(command: C): Promise<Output> {
		if (!this.handlers.has(command.name))
			throw new Error(`No handler for command: ${command.name}`);

		const handler = this.handlers.get(command.name) as CommandHandler<
			C,
			Promise<Output>
		>;

		console.log(
			"Dispatching command",
			command.name,
			"handling using",
			handler.constructor.name
		);

		return handler.execute(command);
	}

	public register<C extends Command, Output>(
		commandName: string,
		handler: CommandHandler<C, Promise<Output>>
	) {
		this.handlers.set(commandName, handler);
		return this;
	}
}
