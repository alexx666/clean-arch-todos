import { List } from "../../../../domain";
import { Events } from "../../../../shared";
import { ListRepository } from "../../../../ports";

export class InMemoryListRepository implements ListRepository {
	constructor(private readonly events: Events = new Events()) { }

	public findByName(id: string): Promise<List | undefined> {
		const listEvents = this.events.filter((event) => event.params.id === id);

		if (!listEvents.length) return Promise.resolve(undefined);

		const list = List.buildFromStream(listEvents);

		return Promise.resolve(list);
	}
}
