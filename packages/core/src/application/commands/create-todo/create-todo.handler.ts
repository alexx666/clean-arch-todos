import { CommandHandler } from "../../handler";

import { CreateTodo } from "./create-todo.command";

export interface CreateTodoResponse {
	id: string;
}

export type ICreateTodoHandler = CommandHandler<
	CreateTodo,
	Promise<void>
>;
