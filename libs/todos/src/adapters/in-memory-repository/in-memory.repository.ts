import { List } from "../../entities";
import { Events } from "../../events";
import { ListRepository } from "../../ports";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Events = new Events()) { }

	public async findById(id: string): Promise<List> {
		const listEvents = this.events.filter((event) => event.details.id === id);

		if (!listEvents.length) throw new Error("[InMemoryTodoRepository] Error: List does not exist!");

		return List.buildFromStream(listEvents);
	}
}
