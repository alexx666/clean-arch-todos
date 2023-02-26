import { Command } from "commander";
import { randomUUID } from "crypto";

import { DeleteTodoController } from "../../../../controllers";
import { Client } from "../../../data-access";

export default new Command("delete")
	.alias("rm")
	.description("Delete todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("--id <id>", "todo ID")
	.action((cmd) => new DeleteTodoController(new Client(), { generate: randomUUID }).handle(cmd));
