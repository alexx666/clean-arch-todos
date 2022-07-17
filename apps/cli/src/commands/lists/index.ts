import { Command } from "commander";

import { CreateListImpl } from "../../boundry/create-list/create-list";

import { config } from "../../config";

import createCmd from "./create-list";

const createList = new CreateListImpl(config);

const listCommand = new Command("lists")

listCommand.addCommand(createCmd(createList));

export default listCommand;
