import { inject, injectable } from "tsyringe";

import { CreateTodo, CREATE_TODO, ICreateTodoHandler } from "@todos/core";

@injectable()
export class CreateTodoController {
	constructor(@inject(CREATE_TODO) private interactor: ICreateTodoHandler) { }

	public async handle({ listName, description, start, end }: any) {

		const request = new CreateTodo({
			listName: String(listName),
			description: String(description),
			start: String(start),
			end: String(end),
		});

		const result = await this.interactor.execute(request);

		console.log("Todo Added!");
		console.table(result);
	}
}
