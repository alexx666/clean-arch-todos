import { Command } from "commander";

import { client, listTodos } from "../../client";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos));
todosCommand.addCommand(createCmd(client));
todosCommand.addCommand(deleteCmd(client));

export default todosCommand;
