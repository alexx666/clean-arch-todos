import { IListCreatedHandler, ListCreated } from "@todos/core";

export class ListCreatedHandler implements IListCreatedHandler {
	public execute(command: ListCreated) {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
