import { Todo } from "../../../domain";
import { Command } from "../../command";
import { Event } from "../../event";

export const TODO_REMOVED = "TodoRemoved";

/**
 * {@link Command} emitted when a {@link Todo} is removed from a {@link List}.
 */
export class TodoRemoved implements Command<Todo>, Event {
	public readonly name: string = TODO_REMOVED;

	constructor(
		public readonly id: string,
		public readonly stream: string,
		public readonly params: Todo
	) { }
}
