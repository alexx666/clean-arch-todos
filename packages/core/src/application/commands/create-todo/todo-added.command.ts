import { Todo } from "../../../domain";
import { Command } from "../../command";
import { Event } from "../../event";

// FIXME: duplicate definition
export interface TodoDetails {
	id: string;
	description: string;
	startDate: string;
	endDate: string;
	listId: string;
}

export const TODO_ADDED = "TodoAdded";

/**
 * {@link Command} emitted when a {@link Todo} is added to a {@link List}.
 * Holds the details of the {@link Todo} in a {@link TodoDetails} object
 */
export class TodoAdded implements Command<TodoDetails>, Event {
	public readonly name: string = TODO_ADDED;
	public readonly timestamp: number;
	public readonly params: TodoDetails;

	constructor(
		public readonly id: string,
		public readonly stream: string,
		todo: Todo
	) {
		this.params = {
			id: todo.id,
			listId: todo.listId,
			startDate: todo.startDate.toISOString(),
			endDate: todo.endDate.toISOString(),
			description: todo.description,
		};
		this.timestamp = Date.now();
	}
}
