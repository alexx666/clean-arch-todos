import { List } from "../../entities";
import { Events } from "../../events";
import { ListRepository } from "../../ports";

export default class InMemoryTodoRepository implements ListRepository {
	constructor(private readonly events: Events = new Events()) { }

	public findByName(id: string): Promise<List | undefined> {
		const listEvents = this.events.filter((event) => event.details.id === id);

		if (!listEvents.length) return Promise.resolve(undefined);

		const list = List.buildFromStream(listEvents);

		return Promise.resolve(list);
	}
}
