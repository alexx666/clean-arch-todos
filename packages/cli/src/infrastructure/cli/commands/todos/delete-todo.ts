import { container } from "tsyringe";
import { Command } from "commander";

import { DeleteTodoController } from "../../../../controllers";

export default new Command("delete")
	.alias("rm")
	.description("Delete todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("--id <id>", "todo ID")
	.action((cmd) => container.resolve(DeleteTodoController).handle(cmd));
