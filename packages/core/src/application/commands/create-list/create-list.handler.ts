import { List } from "../../../domain";
import { IMediator, ListRepository, UuidGenerator } from "../../../ports";
import { CommandHandler } from "../../../kernel";

import { CreateList } from "./create-list.command";
import { ListCreated } from "./list-created.command";

export type ICreateListHandler = CommandHandler<CreateList, Promise<void>>;

export class CreateListHandler implements ICreateListHandler {
	constructor(
		private readonly publisher: IMediator,
		private readonly repository: ListRepository,
		private readonly uuids: UuidGenerator,
	) { }

	public async execute(command: CreateList): Promise<void> {
		const { name } = command.params;

		const existingList = await this.repository.findByName(name);

		if (existingList) throw new Error("[CreateList] Error: List aleady exist!");

		const newList = new List({ ...command.params, id: this.uuids.generate() });

		const listCreated = new ListCreated(this.uuids.generate(), newList);

		await this.publisher.send(listCreated);
	}
}
