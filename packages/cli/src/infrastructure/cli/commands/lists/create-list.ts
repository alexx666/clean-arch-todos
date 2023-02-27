import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID } from "crypto";

import { CreateListController } from "../../../../controllers";
import { CreateListHandler, defaultConfig, defaultOptions } from "../../../data-access";

export default new Command("create")
	.alias("mk")
	.description("Creates new list")
	.requiredOption("-n, --list-name <list>", "List name")
	.action((cmd) => {
		const handler = new CreateListHandler(defaultConfig);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new CreateListController(retriableHandler, { generate: randomUUID });

		return controller.handle(cmd)
	});
