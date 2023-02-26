import { Command, CommandParameters, CREATE_LIST, CREATE_TODO, DELETE_TODO, IMediator, LocalLazyMediator, RetriableCommandHandler, RetryConfig } from "@todos/core";

import { CreateTodoHandler, CreateListHandler, DeleteTodoHandler } from "./requests";
import { ClientConfig, defaultConfig, defaultOptions } from "./config";

export class Client implements IMediator {

	private readonly mediator = new LocalLazyMediator();

	constructor(config: ClientConfig = defaultConfig, options: RetryConfig = defaultOptions) {
		this.mediator
			.on({ command: CREATE_TODO, useFactory: () => new RetriableCommandHandler(new CreateTodoHandler(config), options) })
			.on({ command: CREATE_LIST, useFactory: () => new RetriableCommandHandler(new CreateListHandler(config), options) })
			.on({ command: DELETE_TODO, useFactory: () => new RetriableCommandHandler(new DeleteTodoHandler(config), options) })
	}

	public send<Output>(command: Command<CommandParameters>): Promise<void | Output> {
		return this.mediator.send(command);
	}

}
