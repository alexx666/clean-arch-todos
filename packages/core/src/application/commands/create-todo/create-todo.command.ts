import { Command, CommandParameters } from "../../../shared";

export const CREATE_TODO = "CreateTodo";

export interface CreateTodoParameters extends CommandParameters {
	id?: string;
	description: string;
	start: string;
	end: string;
	listName: string;
}

export class CreateTodo implements Command {
	public readonly name = CREATE_TODO;

	constructor(public readonly params: CreateTodoParameters) { }
}
