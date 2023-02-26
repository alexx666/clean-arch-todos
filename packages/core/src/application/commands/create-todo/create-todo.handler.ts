import { Todo } from "../../../domain";
import { IMediator, ListRepository, UuidGenerator } from "../../../ports";
import { CommandHandler } from "../../../kernel";

import { CreateTodo } from "./create-todo.command";
import { TodoAdded } from "./todo-added.command";

export interface CreateTodoResponse {
	id: string;
}

export type ICreateTodoHandler = CommandHandler<
	CreateTodo,
	Promise<void>
>;

export class CreateTodoHandler implements ICreateTodoHandler {
	constructor(
		private readonly repository: ListRepository,
		private readonly uuids: UuidGenerator,
		private readonly publisher: IMediator
	) { }

	public async execute(command: CreateTodo): Promise<void> {
		const { description, start, end, listName } = command.params;

		const startDate = new Date(start);
		const endDate = new Date(end);
		const id = this.uuids.generate();

		const todo = new Todo({ id, description, startDate, endDate, listName });

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[CreateTodo] Error: List does not exist!");

		list.add(todo);

		await this.publisher.send(new TodoAdded(this.uuids.generate(), todo));
	}
}
