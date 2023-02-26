import { Command } from "commander";
import { randomUUID } from "crypto";

import { CreateTodoController } from "../../../../controllers";
import { Client } from "../../../data-access";

export default new Command("create")
	.alias("mk")
	.description("Create todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("-d, --description <description>", "todo description")
	.requiredOption("-s, --start <start>", "todo start date in ISO format")
	.requiredOption("-e, --end <end>", "todo end date in ISO format")
	.action((cmd) => new CreateTodoController(new Client(), { generate: randomUUID }).handle(cmd));
