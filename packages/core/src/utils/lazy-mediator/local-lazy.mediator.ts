import { Command, CommandHandler } from "../../application";
import { IMediator } from "../../ports";

export type HandlerFactoryMethod = () => CommandHandler<Command>;

export interface CommandRegistration {
	command: string;
	useFactory: HandlerFactoryMethod;
}

export class LocalLazyMediator implements IMediator {

	constructor(private readonly registry: Map<string, HandlerFactoryMethod> = new Map()) { }

	public send<C extends Command, Output>(command: C): Promise<Output> {

		const handlerFactory = this.registry.get(command.name);

		if (!handlerFactory) throw new Error(`No handler for command: ${command.name}`);

		const handler = handlerFactory() as CommandHandler<C, Promise<Output>>;

		console.log("Dispatching command", command.name, "handling using", handler.constructor.name);

		return handler.execute(command);
	}

	public on(registration: CommandRegistration) {
		this.registry.set(registration.command, registration.useFactory);
		return this;
	}
}
