import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { CreateTodoImpl } from "../../../libs/todos/boundry/create-todo/create-todo";
import { DeleteTodoImpl } from "../../../libs/todos/boundry/delete-todo/delete-todo";
import { ListTodosImpl } from "../../../libs/todos/boundry/list-todos/list-todos";

import { todoGateway } from "../../db";

const listTodos = new ListTodosImpl(todoGateway)
const createTodo = new CreateTodoImpl(todoGateway)
const deleteTodo = new DeleteTodoImpl(todoGateway)

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos))
todosCommand.addCommand(createCmd(createTodo))
todosCommand.addCommand(deleteCmd(deleteTodo))

export default todosCommand;
