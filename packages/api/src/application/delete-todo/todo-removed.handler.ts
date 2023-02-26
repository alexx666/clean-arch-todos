import { ITodoRemovedHandler, TodoRemoved } from "@todos/core";

export class TodoRemovedHandler implements ITodoRemovedHandler {
	public execute(command: TodoRemoved): void {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
