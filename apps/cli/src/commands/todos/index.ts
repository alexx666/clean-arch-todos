import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { CreateTodoImpl, DeleteTodoImpl, ListTodosImpl } from "@alexx666/todos";

import { todoGateway } from "../../db";

const listTodos = new ListTodosImpl(todoGateway)
const createTodo = new CreateTodoImpl(todoGateway)
const deleteTodo = new DeleteTodoImpl(todoGateway)

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos))
todosCommand.addCommand(createCmd(createTodo))
todosCommand.addCommand(deleteCmd(deleteTodo))

export default todosCommand;
