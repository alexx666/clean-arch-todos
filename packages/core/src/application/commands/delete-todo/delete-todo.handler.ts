import { IMediator, ListRepository } from "../../../ports";
import { CommandHandler } from "../../../kernel";

import { DeleteTodo } from "./delete-todo.command";
import { TodoRemoved } from "./todo-removed.command";

export type IDeleteTodoHandler = CommandHandler<DeleteTodo, Promise<void>>;

export class DeleteTodoHandler implements IDeleteTodoHandler {
	constructor(
		private readonly publisher: IMediator,
		private readonly repository: ListRepository
	) { }

	public async execute(command: DeleteTodo): Promise<void> {
		const { listName, id } = command.params;

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[DeleteTodo] Error: List does not exist!");

		const deletedTodo = list.remove(id);

		await this.publisher.send(new TodoRemoved(deletedTodo));
	}
}
