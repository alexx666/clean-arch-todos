import { Mediator, ListRepository } from "../../ports";
import { CommandHandler } from "../../shared";

import { DeleteTodo } from "./delete-todo.command";
import { TodoRemoved } from "./todo-removed.event";

export class DeleteTodoHandler implements CommandHandler<DeleteTodo, Promise<void>> {

	constructor(
		private readonly publisher: Mediator,
		private readonly repository: ListRepository
	) { }

	public async execute(command: DeleteTodo): Promise<void> {
		const { listName, id } = command.params;

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[DeleteTodo] Error: List does not exist!");

		const deletedTodo = list.remove(id);

		await this.repository.save(list);

		await this.publisher.send(new TodoRemoved(deletedTodo));
	}
}
