import { Command } from "commander";

import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

import { CreateTodoImpl, DeleteTodoImpl, ListTodosImpl, UuidV4 } from "@alexx666/todos";

import { todoGateway } from "../../db";

const listTodos = new ListTodosImpl(todoGateway)

const createTodo = new CreateTodoImpl({
    repository: todoGateway,
    uuidProvider: new UuidV4(),
})

const deleteTodo = new DeleteTodoImpl(todoGateway)

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos))
todosCommand.addCommand(createCmd(createTodo))
todosCommand.addCommand(deleteCmd(deleteTodo))

export default todosCommand;
