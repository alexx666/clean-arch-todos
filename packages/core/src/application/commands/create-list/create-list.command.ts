import { Command, CommandParameters } from "../../../kernel";

export const CREATE_LIST = "CreateList";

export interface CreateListParameters extends CommandParameters {
	name: string;
	allowDuplicates: boolean;
	allowExpired: boolean;
	maxTodos: number;
}

export class CreateList implements Command {
	public readonly name = CREATE_LIST;

	constructor(public readonly id: string, public readonly params: Readonly<CreateListParameters>) { }
}
