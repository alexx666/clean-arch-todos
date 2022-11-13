import { Command } from "commander";

import { client } from "../../client";

import createCmd from "./create-list";

const listCommand = new Command("lists");

listCommand.addCommand(createCmd(client));

export default listCommand;
