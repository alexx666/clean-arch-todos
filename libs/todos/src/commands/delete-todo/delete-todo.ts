import { TodoRemoved } from "../../events";
import { EventPublisher, ListRepository, CommandConfig } from "../../ports";

export interface DeleteTodo {
	execute(request: DeleteTodoRequest): Promise<void>;
}

export interface DeleteTodoRequest {
	listName: string;
	id: string;
}

export class DeleteTodoImpl implements DeleteTodo {

	private repository: ListRepository;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.repository = config.repository;
	}

	public async execute(request: DeleteTodoRequest): Promise<void> {

		const { listName, id } = request;

		const list = await this.repository.findById(listName);

		const deletedTodo = list.remove(id)

		await this.publisher.publish(new TodoRemoved(deletedTodo));
	}
}
