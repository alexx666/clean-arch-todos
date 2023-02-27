import { DeleteTodo, DeleteTodoParameters, IDeleteTodoHandler, UuidGenerator } from "@todos/core";

export class DeleteTodoController {
	constructor(private handler: IDeleteTodoHandler, private uuids: UuidGenerator) { }

	public async handle({ listName, id }: any) {
		const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

		await this.handler.execute(new DeleteTodo(this.uuids.generate(), request));

		console.log("Todo Removed:", id);
	}
}
