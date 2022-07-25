import { List } from "../../entities";
import { Event, StateBuilder } from "../../events";
import { ListRepository } from "../../ports";

export default class InMemoryTodoRepository implements ListRepository {

	constructor(private readonly events: Event<any>[] = []) { }

	public async findById(id: string): Promise<List> {
		const listEvents = this.events.filter((event) => event.id === id || event.details.listName === id);

		if (!listEvents.length) throw new Error("[InMemoryTodoRepository] Error: List does not exist!");

		return StateBuilder.buildListStateFrom(listEvents);
	}
}
