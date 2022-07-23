import List from "../../../entities/list/list";
import ListRepository from "../../../ports/list.repository";

export default class InMemoryTodoGateway implements ListRepository {

	constructor(private documents: Set<List> = new Set<List>()) { }

	public async update(list: List): Promise<void> {
		const existingList = Array.from(this.documents).find(doc => doc.name.value === list.name.value);

		if (!existingList) throw new Error("List does not exist!");
	}

	public async create(list: List): Promise<void> {
		const existingList = Array.from(this.documents).find(doc => doc.name.value === list.name.value);

		if (existingList !== undefined) throw new Error("List already exists!");

		this.documents.add(list);
	}

	public async get(name: string): Promise<List> {
		const result = Array.from(this.documents).find(doc => doc.name.value === name)

		if (!result) throw new Error("List does not exist!");

		return result;
	}
}
