import { Command } from "commander";

import HTTPTodoRepository from "../adapters/http.repository";
import TodoController from "./todo.controller";
import QueryTodos from "../../../core/todos/use-cases/query-todos/query-todos.interactor.impl";
import ConsolePresenter from "./console.presenter";

const presenter = new ConsolePresenter()
const repository = new HTTPTodoRepository()
const queryTodos = new QueryTodos(repository, presenter);
const controller = new TodoController(queryTodos);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

export default todosCommand;