import List from "../../entities/list/list";
import Event from "../../events/event";
import ListRepository from "../../ports/list.repository";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Event<List>[] = []) { }

	public async findById(id: string): Promise<List> {
		const listEvent = this.events.find((event) => event.type.startsWith("List") && event.id === id);

		if (!listEvent) throw new Error("[InMemoryTodoRepository] Error: List does not exist!");

		return listEvent.details;
	}
}
