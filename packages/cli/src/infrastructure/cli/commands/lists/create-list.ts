import { Command } from "commander";
import { randomUUID } from "crypto";

import { CreateListController } from "../../../../controllers";
import { Client } from "../../../data-access";

export default new Command("create")
	.alias("mk")
	.description("Creates new list")
	.requiredOption("-n, --list-name <list>", "List name")
	.action((cmd) => new CreateListController(new Client(), { generate: randomUUID }).handle(cmd));
