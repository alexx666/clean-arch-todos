import { List, IMediator, ListRepository, UuidGenerator, ICreateListHandler, CreateList, ListCreated } from "@todos/core";

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
