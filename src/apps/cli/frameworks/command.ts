import { Command } from "commander";

import DoSomething from "../../../core/do/interactor";
import RESTRepository from "../../../libs/sdk/rest.repository";
import CLIController from "../adapters/cli.controller";
import Console from "../adapters/logger.presenter";

const repository = new RESTRepository()
const logger = new Console()
const useCase = new DoSomething(logger, repository);
const controller = new CLIController(useCase);

async function doSomethingAction(cmd: any) {
    await controller.doSomething(cmd)
}

const doSomethingCommand = new Command();

doSomethingCommand.name("do")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => doSomethingAction(cmd));

export default doSomethingCommand;