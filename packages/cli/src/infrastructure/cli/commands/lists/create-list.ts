import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID as generate } from "crypto";

import { CreateListHandler } from "../../../../application";
import { CreateListController } from "../../../../controllers";
import { HTTPClient, defaultConfig, defaultOptions } from "../../../http";

export default new Command("create")
	.alias("mk")
	.description("Creates new list")
	.requiredOption("-n, --list-name <list>", "List name")
	.action((cmd) => {
		const client = new HTTPClient(defaultConfig);
		const handler = new CreateListHandler(client);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new CreateListController(retriableHandler, { generate });

		return controller.handle(cmd)
	});
