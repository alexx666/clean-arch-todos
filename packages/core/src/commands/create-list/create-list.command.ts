import { Command, CommandParameters } from "../../shared";

export const CREATE_LIST = "CreateList"

export interface CreateListParameters extends CommandParameters {
	listName: string;
	allowDuplicates: boolean;
	allowExpired: boolean;
	maxTodos: number;
}

export class CreateList implements Command {
	public readonly name = CREATE_LIST;

	constructor(public readonly params: Readonly<CreateListParameters>) { }
}
