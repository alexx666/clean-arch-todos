import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { ListTodosImpl } from "../../boundry/list-todos/list-todos";
import { CreateTodoImpl } from "../../boundry/create-todo/create-todo";
import { DeleteTodoImpl } from "../../boundry/delete-todo/delete-todo";

import { config } from "../../config";

import { CryptoUuid } from "@alexx666/todos-core";

const listTodos = new ListTodosImpl(config);
const createTodo = new CreateTodoImpl(config, new CryptoUuid());
const deleteTodo = new DeleteTodoImpl(config);

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos));
todosCommand.addCommand(createCmd(createTodo));
todosCommand.addCommand(deleteCmd(deleteTodo));

export default todosCommand;
