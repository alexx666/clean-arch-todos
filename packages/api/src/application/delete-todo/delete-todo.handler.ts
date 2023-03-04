import { IDeleteTodoHandler, DeleteTodo, IMediator, ListRepository, UuidGenerator, TodoRemoved } from "@todos/core";

export class DeleteTodoHandler implements IDeleteTodoHandler {
	constructor(
		private readonly publisher: IMediator,
		private readonly repository: ListRepository,
		private readonly uuids: UuidGenerator,
	) { }

	public async execute(command: DeleteTodo): Promise<void> {
		const { listName, id } = command.params;

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[DeleteTodo] Error: List does not exist!");

		const deletedTodo = list.remove(id);

		await this.publisher.send(new TodoRemoved(this.uuids.generate(), list.id, deletedTodo));
	}
}
