import { CommandHandler } from "../../shared";

import { TodoRemoved } from "./todo-removed.event";

export type ITodoRemovedHandler = CommandHandler<TodoRemoved, void>;

export class TodoRemovedHandler implements ITodoRemovedHandler {
	public execute(command: TodoRemoved): void {
		console.log("Handling event", command.name, "with details", JSON.stringify(command.params));
	}

}
