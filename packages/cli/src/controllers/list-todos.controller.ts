import { IListTodos, ListTodosRequest } from "@todos/core";

export const LIST_TODOS = "ListTodos";

export class ListTodosController {
	constructor(private interactor: IListTodos) { }

	public async handle({ listName }: any) {
		const request: ListTodosRequest = {
			listName: String(listName),
		};

		const response = await this.interactor.execute(request);

		console.table(response.items);
	}
}
