import { List } from "../../../domain";
import { IMediator, ListRepository } from "../../../ports";
import { CommandHandler } from "../../../kernel";

import { CreateList } from "./create-list.command";
import { ListCreated } from "./list-created.command";

export type ICreateListHandler = CommandHandler<CreateList, Promise<void>>;

export class CreateListHandler implements ICreateListHandler {
	constructor(
		private readonly publisher: IMediator,
		private readonly repository: ListRepository
	) { }

	public async execute(command: CreateList): Promise<void> {
		const { name } = command.params;

		const existingList = await this.repository.findByName(name);

		if (existingList) throw new Error("[CreateList] Error: List aleady exist!");

		const newList = new List(command.params);

		const listCreated = new ListCreated(newList);

		await this.publisher.send(listCreated);
	}
}
