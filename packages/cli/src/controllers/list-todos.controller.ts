import { IListTodos, ListTodosRequest } from "@todos/core";

export const LIST_TODOS = "ListTodos";

export class ListTodosController {
	constructor(private interactor: IListTodos) { }

	public async handle({ listId }: any) {
		const request: ListTodosRequest = {
			listId: String(listId),
		};

		const response = await this.interactor.execute(request);

		console.table(response.items);
	}
}
