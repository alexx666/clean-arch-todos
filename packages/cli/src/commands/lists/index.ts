import { InMemoryMediator } from "@alexx666/todos-core";
import { Command } from "commander";

import handlers from "../../boundry";

import createCmd from "./create-list";

const mediator = new InMemoryMediator(handlers);

const listCommand = new Command("lists");

listCommand.addCommand(createCmd(mediator));

export default listCommand;
