import TodoRemoved from "../../events/todo-removed";
import EventPublisher from "../../ports/event.publisher";
import ListRepository from "../../ports/list.repository";
import CommandConfig from "../../ports/command.config";

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
