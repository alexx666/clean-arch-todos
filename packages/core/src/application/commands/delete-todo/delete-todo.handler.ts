import { CommandHandler } from "../../handler";

import { DeleteTodo } from "./delete-todo.command";

export type IDeleteTodoHandler = CommandHandler<DeleteTodo, void>;
