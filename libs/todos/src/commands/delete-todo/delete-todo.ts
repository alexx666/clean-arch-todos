import EventPublisher from "../../ports/event.publisher";
import ListRepository from "../../ports/list.repository";
import UuidProvider from "../../ports/uuid";
import CommandConfig from "../command.config";

export interface DeleteTodo {
	execute(request: DeleteTodoRequest): Promise<void>;
}

export interface DeleteTodoRequest {
	listName: string;
	id: string;
}

export const TODO_DELETED = "TodoDeleted";

export class DeleteTodoImpl implements DeleteTodo {

	private repository: ListRepository;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.repository = config.repository;
	}

	public async execute(request: DeleteTodoRequest): Promise<void> {

		const { listName, id } = request;

		const list = await this.repository.findByName(listName);

		const deletedTodo = list.remove(id)

		await this.publisher.publish({
			id,
			type: TODO_DELETED,
			details: deletedTodo,
			timestamp: Date.now()
		});
	}
}
