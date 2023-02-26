import { ITodoAddedHandler, TodoAdded } from "@todos/core";

export class TodoAddedHandler implements ITodoAddedHandler {
	public async execute(command: TodoAdded): Promise<void> {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
