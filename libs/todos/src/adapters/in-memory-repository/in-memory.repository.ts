import List from "../../entities/list/list";
import Event from "../../events/event";
import ListRepository from "../../ports/list.repository";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Event<any>[] = []) { }

	// TODO: implement write model projection
	public async findById(id: string): Promise<List> {
		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}

	// TODO: implement write model projection
	public async findByName(name: string): Promise<List> {
		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}
}
