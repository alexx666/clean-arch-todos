import { CommandHandler } from "../../shared";

import { ListCreated } from "./list-created.event";

export class ListCreatedHandler implements CommandHandler<ListCreated, void> {
	public execute(command: ListCreated) {
		console.log("Handling event", command.name, "with details", JSON.stringify(command.params));
	}
}
