import { Todo } from "../../entities";
import { DomainEvent } from "../../shared";

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
 * {@link DomainEvent} emitted when a {@link Todo} is added to a {@link List}.
 * Holds the details of the {@link Todo} in a {@link TodoDetails} object
 */
export class TodoAdded implements DomainEvent<TodoDetails> {
	public readonly name: string = TODO_ADDED;
	public readonly params: TodoDetails;
	public readonly timestamp: number = Date.now();
	public readonly stream: string;

	constructor(todo: Todo) {
		this.stream = `List:${todo.listName}`;

		this.params = {
			id: todo.id,
			listName: todo.listName,
			startDate: todo.startDate.toISOString(),
			endDate: todo.endDate.toISOString(),
			description: todo.description,
		};
	}
}
