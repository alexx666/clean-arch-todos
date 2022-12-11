import { registry } from "tsyringe";
import { Command, program } from "commander";

import { CREATE_TODO, CREATE_LIST, DELETE_TODO } from "@todos/core";

import { CreateTodoHandler, CreateListHandler, DeleteTodoHandler, ListTodos } from "../../application";
import { LIST_TODOS } from "../../controllers";

import { config } from "../data-access";

@registry([
	{ token: CREATE_TODO, useFactory: () => new CreateTodoHandler(config) },
	{ token: CREATE_LIST, useFactory: () => new CreateListHandler(config) },
	{ token: DELETE_TODO, useFactory: () => new DeleteTodoHandler(config) },
	{ token: LIST_TODOS, useFactory: () => new ListTodos(config) }
])
export class CLI {
	constructor(
		version: string,
		availableCommands: Command[],
	) {

		program.version(version);

		for (const command of availableCommands) {
			program.addCommand(command);
		}
	}

	public async start(args: string[]) {
		try {
			await program.parseAsync(args);
		} catch (error) {
			console.error("Error:", (error as Error).message);
			console.debug((error as Error).stack);
		}
	}
}
