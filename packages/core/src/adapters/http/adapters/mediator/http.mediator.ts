import { ListCreated, LIST_CREATED, TodoAdded, TodoRemoved, TODO_ADDED, TODO_REMOVED } from "../../../../commands";
import { Mediator } from "../../../../ports";
import { Command } from "../../../../shared";
import { Config, Request } from "../../util";

export class HttpMediator implements Mediator {

	constructor(private readonly config: Config) { }

	// FIXME convert to map
	public async send(command: Command): Promise<any> {

		switch (command.name) {
			case LIST_CREATED:
				return new Request<void>({
					url: `${this.config.apiUrl}/lists`,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name: (command as ListCreated).params.name }),
				}).send();
			case TODO_REMOVED:
				return new Request<void>({
					url: `${this.config.apiUrl}/lists/${(command as TodoRemoved).params.listName}/todos/${(command as TodoRemoved).params.id}`,
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}).send();
			case TODO_ADDED:
				return new Request<void>({
					url: `${this.config.apiUrl}/lists/${(command as TodoAdded).params.listName}/todos`,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: (command as TodoAdded).params.id,
						description: (command as TodoAdded).params.description,
						start: (command as TodoAdded).params.startDate,
						end: (command as TodoAdded).params.endDate,
					}),
				}).send();
			default:
				throw new Error("Unknown operation performed");
		}
	}

}
