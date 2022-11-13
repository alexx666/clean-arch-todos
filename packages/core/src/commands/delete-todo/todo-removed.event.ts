import { Todo } from "../../entities";

import { DomainEvent } from "../../shared";

/**
 * {@link DomainEvent} emitted when a {@link Todo} is removed from a {@link List}.
 */
export class TodoRemoved implements DomainEvent<Todo> {
	public readonly type: string = "TodoRemoved";
	public readonly details: Todo;
	public readonly timestamp: number = Date.now();
	public readonly stream: string;

	constructor(todo: Todo) {
		this.stream = `List:${todo.listName}`;
		this.details = todo;
	}
}
