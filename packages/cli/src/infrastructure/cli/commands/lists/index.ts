import { Command } from "commander";

import createList from "./create-list";

export const listCommand = new Command("lists")
	.addCommand(createList);
