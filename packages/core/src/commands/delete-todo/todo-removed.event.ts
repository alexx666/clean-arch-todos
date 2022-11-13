import { Todo } from "../../entities";

import { DomainEvent } from "../../shared";

export const TODO_REMOVED = "TodoRemoved";

/**
 * {@link DomainEvent} emitted when a {@link Todo} is removed from a {@link List}.
 */
export class TodoRemoved implements DomainEvent<Todo> {
	public readonly name: string = TODO_REMOVED;
	public readonly params: Todo;
	public readonly timestamp: number = Date.now();
	public readonly stream: string;

	constructor(todo: Todo) {
		this.stream = `List:${todo.listName}`;
		this.params = todo;
	}
}
