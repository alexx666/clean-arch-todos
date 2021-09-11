import List from "../../entities/list/list";
import { ListRepository } from "../../repository/list.repository";
import Name from "../../value-objects/list-name";

export interface CreateList {
	execute(request: CreateListRequest): Promise<void>;
}

export interface CreateListRequest {
	listName: string;
}

export class CreateListImpl implements CreateList {

	constructor(private repository: ListRepository) { }

	public async execute(request: CreateListRequest): Promise<void> {

		const { listName } = request;

		const newList = new List(Name.create(listName));

		await this.repository.create(newList);
	}
}
