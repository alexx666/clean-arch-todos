import { Event, Events, TodoDetails } from "../events";

export interface TodoItemParameters {
	id: string;
	start: string;
	end: string;
	expired: boolean;
	description: string;
	isDeleted: boolean;
}

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

	public static buildFromStream(events: Events | Event[]): TodoItem {
		const params: Partial<TodoItemParameters> = {};

		for (const { type, details } of events) {
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
