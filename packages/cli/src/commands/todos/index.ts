import { Command } from "commander";

import { config, HttpListTodos } from "@alexx666/todos-core";

import { client } from "../../client";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(new HttpListTodos(config)));
todosCommand.addCommand(createCmd(client));
todosCommand.addCommand(deleteCmd(client));

export default todosCommand;
