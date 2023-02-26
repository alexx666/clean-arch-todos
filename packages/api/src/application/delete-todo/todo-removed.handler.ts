import { ITodoRemovedHandler, TodoRemoved } from "@todos/core";

export class TodoRemovedHandler implements ITodoRemovedHandler {
	public async execute(command: TodoRemoved): Promise<void> {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
