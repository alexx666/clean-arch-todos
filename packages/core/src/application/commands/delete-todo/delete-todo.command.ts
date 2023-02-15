import { Command, CommandParameters } from "../../../kernel";

export const DELETE_TODO = "DeleteTodo";

export interface DeleteTodoParameters extends CommandParameters {
	listName: string;
	id: string;
}

export class DeleteTodo implements Command {
	public readonly name = DELETE_TODO;

	constructor(public readonly params: DeleteTodoParameters) { }
}
