import { inject, injectable } from "tsyringe";

import { CreateList, CREATE_LIST, ICreateListHandler, UuidGenerator, UUIDS } from "@todos/core";

@injectable()
export class CreateListController {
	constructor(@inject(CREATE_LIST) private interactor: ICreateListHandler, @inject(UUIDS) private uuids: UuidGenerator) { }

	public async handle({ listName, maxTodos, allowDuplicates, allowExpired }: any) {
		const request = new CreateList({
			id: this.uuids.generate(),
			name: String(listName),
			maxTodos: Number(maxTodos ?? 10),
			allowDuplicates: Boolean(allowDuplicates ?? false),
			allowExpired: Boolean(allowExpired ?? true),
		});

		const result = await this.interactor.execute(request);

		console.log("List Created!");
		console.table(result);
	}
}
