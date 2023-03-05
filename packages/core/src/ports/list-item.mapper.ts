import { Command, Commands, ListDetails } from "../application";
import { ListItem } from "../domain";

export class ListItemProjectionMapper {
	public static buildFromStream(events: Commands | Command[]): ListItem {

		const listItem: Partial<ListItem> = {};

		for (const { name: type, params: details } of events) {
			switch (true) {
				case type === "ListCreated":
					listItem.id = (details as ListDetails).id;
					listItem.name = (details as ListDetails).name;
					listItem.todos = 0 // FIXME: calculate
					listItem.expired = 0 // FIXME: calculate
					break;
				default:
					throw new Error(
						"[TodoItem] Error: Unable to build object state from event stream!"
					);
			}
		}

		return listItem as ListItem; // REVIEW: convert to data class
	}
}
