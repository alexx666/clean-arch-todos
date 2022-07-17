import Todo from "../../entities/todo/todo";
import { ListRepository } from "../../repository/list.repository";
import UuidProvider from "../../util/uuid";

export interface CreateTodo {
	execute(request: CreateTodoRequest): Promise<void>;
}

export interface CreateTodoRequest {
	id?: string;
	description: string;
	start: string;
	end: string;
	listName: string;
}

interface CreateTodoConfig {
	repository: ListRepository;
	uuidProvider: UuidProvider;
}

export class CreateTodoImpl implements CreateTodo {

	private repository: ListRepository;
	private uuidProvider: UuidProvider;

	constructor(config: CreateTodoConfig) {
		this.repository = config.repository;
		this.uuidProvider = config.uuidProvider;
	}

	async execute(request: CreateTodoRequest): Promise<void> {

		const { id, description, start, end, listName } = request;

		const startDate = new Date(start);
		const endDate = new Date(end);

		const todo = new Todo({
			id: id ?? this.uuidProvider.generate(),
			description,
			startDate,
			endDate
		});

		const list = await this.repository.get(listName);

		list.add(todo);

		await this.repository.update(list);
	}
}
