import { Command } from "commander";
import { container } from "tsyringe";

import { CreateTodoController } from "../../../../controllers";

export default new Command("create")
	.alias("mk")
	.description("Create todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("-d, --description <description>", "todo description")
	.requiredOption("-s, --start <start>", "todo start date in ISO format")
	.requiredOption("-e, --end <end>", "todo end date in ISO format")
	.action((cmd) => container.resolve(CreateTodoController).handle(cmd));
