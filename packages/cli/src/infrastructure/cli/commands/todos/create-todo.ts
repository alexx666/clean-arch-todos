import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID } from "crypto";

import { CreateTodoController } from "../../../../controllers";
import { CreateTodoHandler, defaultConfig, defaultOptions } from "../../../data-access";

export default new Command("create")
	.alias("mk")
	.description("Create todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("-d, --description <description>", "todo description")
	.requiredOption("-s, --start <start>", "todo start date in ISO format")
	.requiredOption("-e, --end <end>", "todo end date in ISO format")
	.action((cmd) => {
		const handler = new CreateTodoHandler(defaultConfig);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new CreateTodoController(retriableHandler, { generate: randomUUID });

		return controller.handle(cmd)
	});
