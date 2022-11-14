import { List } from "../../entities";
import { IMediator, ListRepository } from "../../ports";
import { CommandHandler } from "../../shared";

import { CreateList } from "./create-list.command";
import { ListCreated } from "./list-created.event";

export type ICreateListHandler = CommandHandler<CreateList, Promise<void>>;

export class CreateListHandler implements ICreateListHandler {

	constructor(
		private readonly publisher: IMediator,
		private readonly repository: ListRepository
	) { }

	public async execute(command: CreateList): Promise<void> {
		const { listName: name, allowDuplicates, maxTodos, allowExpired } = command.params;

		const existingList = await this.repository.findByName(name);

		if (existingList) throw new Error("[CreateList] Error: List aleady exist!");

		const newList = new List({ name, allowDuplicates, allowExpired, maxTodos });

		await this.repository.save(newList);

		await this.publisher.send(new ListCreated(newList));
	}
}
