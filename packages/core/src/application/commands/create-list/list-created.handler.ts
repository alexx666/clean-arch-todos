import { CommandHandler } from "../../../kernel";

import { ListCreated } from "./list-created.event";

export type IListCreatedHandler = CommandHandler<ListCreated, void>;

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
