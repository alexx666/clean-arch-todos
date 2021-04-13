import { Command } from "commander";

import RestTodoGateway from "../../geteways/http.todos";
import TodoController from "./todo.controller";
import ListTodosImpl from "../../todos/impl/list-todos.impl";
import CreateTodoImpl from "../../todos/impl/create-todo.impl";

const repository = new RestTodoGateway()
const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository);
const controller = new TodoController(listTodos, createTodo);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

todosCommand.command("create")
    .alias("mk")
    .description("Create todo")
    .requiredOption("-d, --description <description>", "todo description")
    .action(cmd => controller.create(cmd));

export default todosCommand;