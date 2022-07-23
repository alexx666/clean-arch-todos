import EventPublisher from "../../ports/event.publisher";
import ListRepository from "../../ports/list.repository";
import UuidProvider from "../../ports/uuid";
import CommandConfig from "../command.config";

export interface DeleteTodo {
	execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse>;
}

export interface DeleteTodoRequest {
	listName: string;
	id: string;
}

export interface DeleteTodoResponse {
	item: TodoItem
}

export const TODO_DELETED = "TodoDeleted";

export interface TodoDeleted extends TodoItem {
	listName: string;
}

// FIXME: interface similar to TodoParameters
interface TodoItem {
	id: string;
	start: string;
	end: string;
	description: string;
}

export class DeleteTodoImpl implements DeleteTodo {

	private repository: ListRepository;
	private uuidProvider: UuidProvider;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.uuidProvider = config.uuidProvider;
		this.repository = config.repository;
	}

	public async execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse> {

		const { listName, id } = request;

		const list = await this.repository.get(listName);

		const deletedTodo = list.remove(id)

		const item = {
			id,
			description: deletedTodo.description,
			start: deletedTodo.startDate.toISOString(),
			end: deletedTodo.endDate.toISOString()
		}

		const details: TodoDeleted = {
			...item,
			listName
		}

		await this.publisher.publish({
			id: this.uuidProvider.generate(),
			type: TODO_DELETED,
			details,
		});

		return { item };
	}
}
