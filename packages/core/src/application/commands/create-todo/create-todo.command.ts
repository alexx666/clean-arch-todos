import { Command, CommandParameters } from "../../command";

export const CREATE_TODO = "CreateTodo";

export interface CreateTodoParameters extends CommandParameters {
	description: string;
	start: string;
	end: string;
	listId: string;
}

export class CreateTodo implements Command {
	public readonly name = CREATE_TODO;

	constructor(
		public readonly id: string,
		public readonly params: CreateTodoParameters
	) { }
}
