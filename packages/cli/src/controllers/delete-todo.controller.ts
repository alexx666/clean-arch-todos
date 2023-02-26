import { inject, injectable } from "tsyringe";

import { DeleteTodo, DeleteTodoParameters, DELETE_TODO, IDeleteTodoHandler, UuidGenerator, UUIDS } from "@todos/core";

@injectable()
export class DeleteTodoController {
	constructor(@inject(DELETE_TODO) private interactor: IDeleteTodoHandler, @inject(UUIDS) private uuid: UuidGenerator) { }

	public async handle({ listName, id }: any) {
		const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

		await this.interactor.execute(new DeleteTodo(this.uuid.generate(), request));

		console.log("Todo Removed:", id);
	}
}
