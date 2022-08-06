import { List } from "../../entities";
import { Events } from "../../events";
import { ListRepository } from "../../ports";

export default class InMemoryTodoRepository implements ListRepository {
	constructor(private readonly events: Events = new Events()) {}

	public async findByName(id: string): Promise<List | undefined> {
		const listEvents = this.events.filter((event) => event.details.id === id);

		if (!listEvents.length) return;

		return List.buildFromStream(listEvents);
	}
}
