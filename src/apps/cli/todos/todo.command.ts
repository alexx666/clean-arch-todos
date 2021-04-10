import { Command } from "commander";

import HTTPTodoRepository from "../adapters/http.repository";
import CLITodoController from "./todo.controller";
import QueryTodos from "../../../core/todos/use-cases/query-todos/query-todos.interactor.impl";
import ConsolePresenter from "./console.presenter";

const presenter = new ConsolePresenter()
const repository = new HTTPTodoRepository()
const useCase = new QueryTodos(repository, presenter);
const controller = new CLITodoController(useCase);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

export default todosCommand;