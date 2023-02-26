import { Commands, Command, TodoDetails } from "../application";
import { TodoItem, TodoItemParameters } from "../domain";

export class TodoItemProjectionMapper {
	/**
	 * Builds {@link TodoItem} objects from its stream of events.
	 * @param events the history of {@link Commands} related to a particular Todo in order of emission.
	 * @returns an instance of {@link TodoItem}
	 */
	public static buildFromStream(events: Commands | Command[]): TodoItem {
		const params: Partial<TodoItemParameters> = {};

		for (const { name: type, params: details } of events) {
			switch (true) {
				case type === "TodoAdded":
					params.id = (details as TodoDetails).id;
					params.description = (details as TodoDetails).description;
					params.start = (details as TodoDetails).startDate;
					params.end = (details as TodoDetails).endDate;
					params.expired =
						Date.now() > new Date((details as TodoDetails).endDate).getTime();

					params.isDeleted = false;

					break;

				case type === "TodoRemoved":
					params.isDeleted = true;

					break;

				default:
					throw new Error(
						"[TodoItem] Error: Unable to build object state from event stream!"
					);
			}
		}

		return new TodoItem(params as TodoItemParameters);
	}
}
