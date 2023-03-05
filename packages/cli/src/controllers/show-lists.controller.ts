import { IShowLists } from "@todos/core";

export class ShowListsController {
	constructor(private interactor: IShowLists) { }

	public async handle() {
		const { items, count } = await this.interactor.execute();

		console.log("Total list count:", count)
		console.table(items);
	}
}
