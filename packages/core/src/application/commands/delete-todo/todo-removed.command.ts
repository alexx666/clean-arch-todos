import { Todo } from "../../../domain";
import { Command } from "../../../kernel";

export const TODO_REMOVED = "TodoRemoved";

/**
 * {@link Command} emitted when a {@link Todo} is removed from a {@link List}.
 */
export class TodoRemoved implements Command<Todo> {
	public readonly name: string = TODO_REMOVED;

	constructor(public readonly id: string, public readonly params: Todo) { }
}
