import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { ListTodosImpl } from "../../boundry/list-todos/list-todos";

import { config } from "../../config";

import { InMemoryMediator } from "@alexx666/todos-core";
import handlers from "../../boundry";

const mediator = new InMemoryMediator(handlers);

const listTodos = new ListTodosImpl(config);

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos));
todosCommand.addCommand(createCmd(mediator));
todosCommand.addCommand(deleteCmd(mediator));

export default todosCommand;
