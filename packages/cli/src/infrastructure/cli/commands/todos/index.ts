import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

export const todosCommand = new Command("todos")
	.addCommand(listCmd)
	.addCommand(createCmd)
	.addCommand(deleteCmd);
