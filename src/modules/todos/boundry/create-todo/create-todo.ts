import Todo from "../../entities/todo/todo";
import { ListRepository } from "../../repository/list.repository";

export interface CreateTodo {
	execute(request: CreateTodoRequest): Promise<void>;
}

export interface CreateTodoRequest {
	description: string;
	start: string;
	end: string;
	listName: string;
}

export class CreateTodoImpl implements CreateTodo {

	constructor(private repository: ListRepository) { }

	async execute(request: CreateTodoRequest): Promise<void> {

		const { description, start, end, listName } = request;

		const startDate = new Date(start);
		const endDate = new Date(end);
		const todo = new Todo(description, startDate, endDate);

		const list = await this.repository.get(listName);

		list.add(todo);

		await this.repository.save(list);
	}
}
