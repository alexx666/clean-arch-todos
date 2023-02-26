import { Command, CommandHandler } from "../../application";
import { IMediator } from "../../ports";

export type HandlerFactoryMethod = () => CommandHandler<Command>;

export interface CommandRegistration {
	command: string;
	useFactory: HandlerFactoryMethod;
}

export class LocalLazyMediator implements IMediator {

	private readonly instances: Map<string, CommandHandler<Command>> = new Map();

	constructor(private readonly registry: Map<string, HandlerFactoryMethod> = new Map()) { }

	public send<C extends Command>(command: C): Promise<void> {

		const initializedHandler = this.instances.get(command.name);

		if (initializedHandler) return initializedHandler.execute(command);

		const handlerFactory = this.registry.get(command.name);

		if (!handlerFactory) throw new Error(`No handler for command: ${command.name}`);

		const handler = handlerFactory();

		this.instances.set(command.name, handler);

		console.log("Dispatching command", command);

		return handler.execute(command);
	}

	public on(registration: CommandRegistration) {
		this.registry.set(registration.command, registration.useFactory);
		return this;
	}
}
