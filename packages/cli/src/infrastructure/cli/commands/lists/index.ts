import { Command } from "commander";

import createList from "./create-list";
import showLists from "./show-lists";

export const listCommand = new Command("lists")
	.addCommand(createList)
	.addCommand(showLists);
