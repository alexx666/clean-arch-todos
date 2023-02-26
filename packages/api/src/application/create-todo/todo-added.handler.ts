import { ITodoAddedHandler, TodoAdded } from "@todos/core";

export class TodoAddedHandler implements ITodoAddedHandler {
	public execute(command: TodoAdded): void {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
