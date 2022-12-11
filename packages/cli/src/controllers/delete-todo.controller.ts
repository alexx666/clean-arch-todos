import { inject, injectable } from "tsyringe";

import { DeleteTodo, DeleteTodoParameters, DELETE_TODO, IDeleteTodoHandler } from "@todos/core";

@injectable()
export class DeleteTodoController {
	constructor(@inject(DELETE_TODO) private interactor: IDeleteTodoHandler) { }

	public async handle({ listName, id }: any) {
		const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

		await this.interactor.execute(new DeleteTodo(request));

		console.log("Todo Removed:", id);
	}
}
