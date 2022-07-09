import { Command } from "commander";

import { CreateListImpl } from "@alexx666/todos";
import { todoGateway } from "../../db";

import createCmd from "./create-list";

const createList = new CreateListImpl(todoGateway);

const listCommand = new Command("lists")

listCommand.addCommand(createCmd(createList));

export default listCommand;
