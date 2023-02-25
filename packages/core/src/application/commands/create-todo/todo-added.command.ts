import { Todo } from "../../../domain";
import { Command } from "../../../kernel";

// FIXME: duplicate definition
export interface TodoDetails {
	id: string;
	description: string;
	startDate: string;
	endDate: string;
	listName: string;
}

export const TODO_ADDED = "TodoAdded";

/**
 * {@link Command} emitted when a {@link Todo} is added to a {@link List}.
 * Holds the details of the {@link Todo} in a {@link TodoDetails} object
 */
export class TodoAdded implements Command<TodoDetails> {
	public readonly name: string = TODO_ADDED;
	public readonly params: TodoDetails;

	constructor(todo: Todo) {
		this.params = {
			id: todo.id,
			listName: todo.listName,
			startDate: todo.startDate.toISOString(),
			endDate: todo.endDate.toISOString(),
			description: todo.description,
		};
	}
}
