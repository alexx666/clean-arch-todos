import { Command } from "commander";

import ListTodos from "../../../libs/todos/use-cases/list-todos.interactor";
import RESTRepository from "../adapters/rest-todo.repository";
import CLITodoController from "../adapters/cli-todo.controller";
import NodeHTTPClient from "./node-http-client";
import ConsolePresenter from "../adapters/console.presenter";

const httpClient = new NodeHTTPClient()
const presenter = new ConsolePresenter();
const repository = new RESTRepository(httpClient)
const useCase = new ListTodos(repository, presenter);
const controller = new CLITodoController(useCase);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

export default todosCommand;