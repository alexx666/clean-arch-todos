import { Command } from "commander";

import { CreateListImpl } from "../../../libs/todos/boundry/create-list/create-list";
import { todoGateway } from "../../db";

import createCmd from "./create-list";

const createList = new CreateListImpl(todoGateway);

const listCommand = new Command("lists")

listCommand.addCommand(createCmd(createList));

export default listCommand;
