import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { ListTodos, config, CreateTodoHandler, DeleteTodoHandler } from "../../client";

export const todosCommand = new Command("todos")
	.addCommand(listCmd(new ListTodos(config)))
	.addCommand(createCmd(new CreateTodoHandler(config)))
	.addCommand(deleteCmd(new DeleteTodoHandler(config)));
