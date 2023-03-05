import { DeleteTodo, DeleteTodoParameters, IDeleteTodoHandler, UuidGenerator } from "@todos/core";

export class DeleteTodoController {
	constructor(private handler: IDeleteTodoHandler, private uuids: UuidGenerator) { }

	public async handle({ listId, id }: any) {
		const request: DeleteTodoParameters = { listId: String(listId), id: String(id) };

		await this.handler.execute(new DeleteTodo(this.uuids.generate(), request));

		console.log("Todo Removed:", id);
	}
}
