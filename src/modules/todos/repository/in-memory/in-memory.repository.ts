import List from "../../entities/list/list";
import { ListRepository } from "../list.repository";

export default class InMemoryTodoGateway implements ListRepository {

	constructor(private documents: Set<List> = new Set<List>()) { }

	public async save(list: List): Promise<void> {
		if (this.documents.has(list)) throw new Error("List already exists!");

		this.documents.add(list);
	}

	public async get(name: string): Promise<List> {
		const result = Array.from(this.documents).find(list => list.name === name)

		if (!result) throw new Error("List does not exist!");

		return result;
	}
}
