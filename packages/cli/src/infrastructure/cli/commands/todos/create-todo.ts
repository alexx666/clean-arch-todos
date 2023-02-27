import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID } from "crypto";

import { CreateTodoHandler } from "../../../../application";
import { CreateTodoController } from "../../../../controllers";
import { defaultConfig, defaultOptions, HTTPRequestBuilder } from "../../../data-access";

export default new Command("create")
	.alias("mk")
	.description("Create todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("-d, --description <description>", "todo description")
	.requiredOption("-s, --start <start>", "todo start date in ISO format")
	.requiredOption("-e, --end <end>", "todo end date in ISO format")
	.action((cmd) => {
		const requestBuilder = new HTTPRequestBuilder(defaultConfig);
		const handler = new CreateTodoHandler(requestBuilder);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new CreateTodoController(retriableHandler, { generate: randomUUID });

		return controller.handle(cmd)
	});
