import List from "../../entities/list/list";
import Event from "../../events/event";
import ListRepository from "../../ports/list.repository";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Event<List>[] = []) { }

	// TODO: implement write model projection
	public async findById(id: string): Promise<List> {
		throw new Error("[InMemoryTodoRepository] Not implemented yet!");
	}

	public async findByName(name: string): Promise<List> {
		const listEvent = this.events.find(event => event.details.listName === name);

		if (!listEvent) throw new Error("[InMemoryTodoRepository] Error: List does not exist!");

		return listEvent.details;
	}
}
