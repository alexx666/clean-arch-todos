import { Todo } from "../entities";
import { DomainEvent } from "./event";

// FIXME: duplicate definition
export interface TodoDetails {
	id: string;
	description: string;
	startDate: string;
	endDate: string;
	listName: string;
}

export class TodoAdded implements DomainEvent<TodoDetails> {
	public readonly type: string = "TodoAdded";
	public readonly details: TodoDetails;
	public readonly timestamp: number = Date.now();
	public readonly stream: string;

	constructor(todo: Todo) {
		this.stream = `List:${todo.listName}`;

		this.details = {
			id: todo.id,
			listName: todo.listName,
			startDate: todo.startDate.toISOString(),
			endDate: todo.endDate.toISOString(),
			description: todo.description,
		};
	}
}
