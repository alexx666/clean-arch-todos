import { Command } from "commander";

import InMemoryTodoGateway from "../../../modules/todos/repository/in-memory/in-memory.repository";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { CreateTodoImpl } from "../../../modules/todos/boundry/create-todo/create-todo";
import { DeleteTodoImpl } from "../../../modules/todos/boundry/delete-todo/delete-todo";
import { ListTodosImpl } from "../../../modules/todos/boundry/list-todos/list-todos";

const todoGateway = new InMemoryTodoGateway()

const listTodos = new ListTodosImpl(todoGateway)
const createTodo = new CreateTodoImpl(todoGateway)
const deleteTodo = new DeleteTodoImpl(todoGateway)

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos))
todosCommand.addCommand(createCmd(createTodo))
todosCommand.addCommand(deleteCmd(deleteTodo))

export default todosCommand;
