import { CreateList, CreateListHandler, CreateTodo, CreateTodoHandler, CREATE_LIST, CREATE_TODO, DeleteTodo, DeleteTodoHandler, DELETE_TODO, ListCreated, LIST_CREATED, TodoAdded, TodoRemoved, TODO_ADDED, TODO_REMOVED } from "../../../../commands";
import { ListRepository, Mediator, UuidGenerator } from "../../../../ports";
import { Command } from "../../../../shared";
import { Config, Request } from "../../util";

export class HttpMediator implements Mediator {

	constructor(
		private readonly config: Config,
		private readonly repository: ListRepository,
		private readonly uuids: UuidGenerator,
	) { }

	// FIXME convert to map
	public async send(command: Command): Promise<any> {

		let request: Request<any>;

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

			// REVIEW: these are in process related calls
			case CREATE_LIST:
				return new CreateListHandler(this, this.repository).execute(command as CreateList);
			case CREATE_TODO:
				return new CreateTodoHandler(this.repository, this.uuids, this).execute(command as CreateTodo);
			case DELETE_TODO:
				return new DeleteTodoHandler(this, this.repository).execute(command as DeleteTodo);
			default:
				throw new Error("Unknown operation performed");
		}
	}

}
