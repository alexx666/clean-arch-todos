import { CreateList, ICreateListHandler, UuidGenerator } from "@todos/core";

export class CreateListController {
	constructor(private handler: ICreateListHandler, private uuids: UuidGenerator) { }

	public async handle({ listName, maxTodos, allowDuplicates, allowExpired }: any) {
		const request = new CreateList(this.uuids.generate(), {
			name: String(listName),
			maxTodos: Number(maxTodos ?? 10),
			allowDuplicates: Boolean(allowDuplicates ?? false),
			allowExpired: Boolean(allowExpired ?? true),
		});

		const result = await this.handler.execute(request);

		console.log("List Created!");
		console.table(result);
	}
}
