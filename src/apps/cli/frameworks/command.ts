import { Command } from "commander";
import MockRepository from "../../../libs/mock/mock.repository";

import DoSomething from "../../../libs/do/interactor";
import CLIController from "../adapters/cli.controller";
import Console from "../adapters/logger.presenter";

const repository = new MockRepository()
const logger = new Console()
const useCase = new DoSomething(logger, repository);
const controller = new CLIController(useCase);

async function doSomethingAction(cmd: any) {
    await controller.doSomething(cmd)
}

const doSomethingCommand = new Command();

doSomethingCommand.name("do").action(doSomethingAction);

export default doSomethingCommand;