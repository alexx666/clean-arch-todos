import { Command } from "commander";

import CLIController from "../../adapters/controllers/cli.controller";
import Repository from "../../adapters/gateways/repository";
import Console from "../../adapters/presenters/logger";
import DoSomething from "../../use-cases/do-something/interactor";

const repository = new Repository()
const logger = new Console()
const useCase = new DoSomething(logger, repository);
const controller = new CLIController(useCase);

async function doSomethingAction(cmd: any) {
    await controller.doSomething(cmd)
}

const doSomethingCommand = new Command();

doSomethingCommand.name("do").action(doSomethingAction);

export default doSomethingCommand;