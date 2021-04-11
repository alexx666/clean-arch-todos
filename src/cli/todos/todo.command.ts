import { Command } from "commander";

import RestTodoGateway from "../../geteways/http.todos";
import TodoController from "./todo.controller";
import ListTodos from "../../todos/interactors/list-todos.impl";

const repository = new RestTodoGateway()
const queryTodos = new ListTodos(repository);
const controller = new TodoController(queryTodos);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

export default todosCommand;