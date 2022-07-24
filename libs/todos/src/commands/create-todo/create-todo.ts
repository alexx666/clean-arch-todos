import Todo from "../../entities/todo/todo";
import EventPublisher from "../../ports/event.publisher";
import ListRepository from "../../ports/list.repository";
import UuidProvider from "../../ports/uuid";
import CommandConfig from "../command.config";

export interface CreateTodo {
	execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
	id?: string;
	description: string;
	start: string;
	end: string;
	listName: string;
}

export interface CreateTodoResponse {
	id: string;
}

export const TODO_CREATED = "TodoCreated";

export class CreateTodoImpl implements CreateTodo {

	private repository: ListRepository;
	private uuidProvider: UuidProvider;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.uuidProvider = config.uuidProvider;
		this.repository = config.repository;
	}

	async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

		const { id: uuid, description, start, end, listName } = request;

		const startDate = new Date(start);
		const endDate = new Date(end);
		const id = uuid ?? this.uuidProvider.generate();

		const todo = new Todo({ id, description, startDate, endDate });

		const list = await this.repository.get(listName);

		list.add(todo);

		await this.publisher.publish({
			id,
			type: TODO_CREATED,
			details: { ...todo, listName },
		});

		return { id }
	}
}
