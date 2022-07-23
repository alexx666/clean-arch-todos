import List from "../../../entities/list/list";
import Event from "../../../events/event";
import ListRepository from "../../../ports/list.repository";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Event<any>[] = []) { }

	public async update(list: List): Promise<void> {
		// const existingList = Array.from(this.documents).find(doc => doc.name.value === list.name.value);

		// if (!existingList) throw new Error("List does not exist!");

		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}

	public async create(list: List): Promise<void> {
		// const existingList = Array.from(this.documents).find(doc => doc.name.value === list.name.value);

		// if (existingList !== undefined) throw new Error("List already exists!");

		// this.documents.add(list);

		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}

	public async get(name: string): Promise<List> {
		// const result = Array.from(this.documents).find(doc => doc.name.value === name)

		// if (!result) throw new Error("List does not exist!");

		// return result;

		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}
}
