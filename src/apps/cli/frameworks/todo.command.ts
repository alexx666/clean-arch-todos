import { Command } from "commander";

import TodoService from "../../../libs/todos/use-cases/interactor";
import RESTRepository from "../adapters/rest-todo.repository";
import CLITodoController from "../adapters/cli-todo.controller";
import ConsolePresenter from "../adapters/console.presenter";
import NodeHTTPClient from "./node-http-client";

const httpClient = new NodeHTTPClient()
const repository = new RESTRepository(httpClient)
const logger = new ConsolePresenter()
const useCase = new TodoService(logger, repository);
const controller = new CLITodoController(useCase);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(async cmd => await controller.list(cmd));

export default todosCommand;