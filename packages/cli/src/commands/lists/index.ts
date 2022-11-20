import { Command } from "commander";

import { config, CreateListHandler } from "../../client";

import createCmd from "./create-list";


export const listCommand = new Command("lists")
	.addCommand(createCmd(new CreateListHandler(config)));
