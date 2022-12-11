import { inject, injectable } from "tsyringe";

import { CreateList, CREATE_LIST, ICreateListHandler } from "@todos/core";

@injectable()
export class CreateListController {
	constructor(@inject(CREATE_LIST) private interactor: ICreateListHandler) { }

	public async handle({ listName, maxTodos, allowDuplicates, allowExpired }: any) {
		const request = new CreateList({
			listName: String(listName),
			maxTodos: Number(maxTodos ?? 10),
			allowDuplicates: Boolean(allowDuplicates ?? false),
			allowExpired: Boolean(allowExpired ?? true),
		});

		const result = await this.interactor.execute(request);

		console.log("List Created!");
		console.table(result);
	}
}
