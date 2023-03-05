import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID as generate } from "crypto";

import { CreateTodoHandler } from "../../../../application";
import { CreateTodoController } from "../../../../controllers";
import { defaultConfig, defaultOptions, HTTPClient } from "../../../http";

export default new Command("create")
	.alias("mk")
	.description("Create todo")
	.requiredOption("-l, --list-id <listId>", "List ID")
	.requiredOption("-d, --description <description>", "todo description")
	.requiredOption("-s, --start <start>", "todo start date in ISO format")
	.requiredOption("-e, --end <end>", "todo end date in ISO format")
	.action((cmd) => {
		const client = new HTTPClient(defaultConfig);
		const handler = new CreateTodoHandler(client);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new CreateTodoController(retriableHandler, { generate });

		return controller.handle(cmd)
	});
