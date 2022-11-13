import { CommandHandler } from "../../shared";

import { TodoRemoved } from "./todo-removed.event";

export class TodoRemovedHandler implements CommandHandler<TodoRemoved, void> {
	public execute(command: TodoRemoved): void {
		console.log("Handling event", command.name, "with details", JSON.stringify(command.params));
	}

}
