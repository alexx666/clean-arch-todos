import { registry } from "tsyringe";
import { Command, program } from "commander";

import { CREATE_TODO, CREATE_LIST, DELETE_TODO, RetriableCommandHandler, UUIDS } from "@todos/core";

import {
	CreateTodoHandler,
	CreateListHandler,
	DeleteTodoHandler,
	ListTodos,
} from "../../application";
import { LIST_TODOS } from "../../controllers";

import { config, defaultRetryConfig } from "../data-access";
import { randomUUID } from "crypto";

@registry([
	{ token: CREATE_TODO, useFactory: () => new RetriableCommandHandler(new CreateTodoHandler(config), defaultRetryConfig) },
	{ token: CREATE_LIST, useFactory: () => new RetriableCommandHandler(new CreateListHandler(config), defaultRetryConfig) },
	{ token: DELETE_TODO, useFactory: () => new RetriableCommandHandler(new DeleteTodoHandler(config), defaultRetryConfig) },
	{ token: LIST_TODOS, useFactory: () => new ListTodos(config) },
	{ token: UUIDS, useValue: { generate: () => randomUUID() } }
])
export class CLI {
	constructor(version: string, availableCommands: Command[]) {
		program.version(version);

		for (const command of availableCommands) {
			program.addCommand(command);
		}
	}

	public async start(args: string[]) {
		let exitCode = 0;
		try {
			await program.parseAsync(args);
		} catch (error) {
			console.error("Error:", error);
			exitCode = 1;
		}

		process.exit(exitCode);
	}
}
