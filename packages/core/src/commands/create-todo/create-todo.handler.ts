import { Todo } from "../../entities";
import { Mediator, ListRepository, UuidGenerator } from "../../ports";
import { CommandHandler } from "../../shared";

import { CreateTodo } from "./create-todo.command";
import { TodoAdded } from "./todo-added.event";

export interface CreateTodoResponse {
	id: string;
}

export class CreateTodoHandler implements CommandHandler<CreateTodo, Promise<CreateTodoResponse>> {

	constructor(
		private readonly repository: ListRepository,
		private readonly uuidProvider: UuidGenerator,
		private readonly publisher: Mediator,
	) { }

	public async execute(command: CreateTodo): Promise<CreateTodoResponse> {
		const { id: uuid, description, start, end, listName } = command.params;

		const startDate = new Date(start);
		const endDate = new Date(end);
		const id = uuid ?? this.uuidProvider.generate();

		const todo = new Todo({ id, description, startDate, endDate, listName });

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[CreateTodo] Error: List does not exist!");

		list.add(todo);

		await this.publisher.notify(new TodoAdded(todo));

		return { id };
	}
}