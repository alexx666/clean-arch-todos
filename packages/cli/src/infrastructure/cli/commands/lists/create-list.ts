import { Command } from "commander";
import { container } from "tsyringe";

import { CreateListController } from "../../../../controllers";

export default new Command("create")
	.alias("mk")
	.description("Creates new list")
	.requiredOption("-n, --list-name <list>", "List name")
	.action((cmd) => container.resolve(CreateListController).handle(cmd));
