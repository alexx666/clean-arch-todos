import { IListTodos, ListTodosRequest } from "@todos/core";
import { inject, injectable } from "tsyringe";

export const LIST_TODOS = "ListTodos";

@injectable()
export class ListTodosController {
	constructor(@inject(LIST_TODOS) private interactor: IListTodos) { }

	public async handle({ listName }: any) {
		const request: ListTodosRequest = {
			listName: String(listName),
		};

		const response = await this.interactor.execute(request);

		console.table(response.items);
	}
}
