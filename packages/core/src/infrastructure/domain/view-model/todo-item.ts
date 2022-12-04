import { TodoDetails } from "../../../application"; // FIXME: should not import application code
import { Event, Events } from "../../../shared";

/**
 * Input parameters for {@link TodoItem} construction
 */
export interface TodoItemParameters {
	/**
	 * Unique identifier
	 */
	id: string;
	/**
	 * ISO compliant date string representing the starting date
	 */
	start: string;
	/**
	 * ISO compliant date string representing the todos deadline
	 */
	end: string;
	/**
	 * Boolean indicating if it has expired or not
	 */
	expired: boolean;
	/**
	 * Todo Item description
	 */
	description: string;
	/**
	 * Boolean indicating if it has been deleted (via soft delete)
	 */
	isDeleted: boolean;
}

/**
 * Read model of the {@link Todo} entity retreived when querying todos.
 */
export class TodoItem {
	public readonly id: string;
	public readonly start: string;
	public readonly end: string;
	public readonly expired: boolean;
	public readonly description: string;
	public readonly isDeleted: boolean;

	private constructor(params: TodoItemParameters) {
		this.id = params.id;
		this.start = params.start;
		this.end = params.end;
		this.expired = params.expired;
		this.description = params.description;
		this.isDeleted = params.isDeleted;
	}

	/**
	 * Builds {@link TodoItem} objects from its stream of events.
	 * @param events the history of {@link Events} related to a particular Todo in order of emission.
	 * @returns an instance of {@link TodoItem}
	 */
	public static buildFromStream(events: Events | Event[]): TodoItem {
		const params: Partial<TodoItemParameters> = {};

		for (const { name: type, params: details } of events) {
			switch (true) {
				case type === "TodoAdded":
					params.id = (details as TodoDetails).id;
					params.description = (details as TodoDetails).description;
					params.start = (details as TodoDetails).startDate;
					params.end = (details as TodoDetails).endDate;
					params.expired = Date.now() > new Date((details as TodoDetails).endDate).getTime();

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
