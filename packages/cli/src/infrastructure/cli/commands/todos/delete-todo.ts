import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID as generate } from "crypto";

import { DeleteTodoHandler } from "../../../../application";
import { DeleteTodoController } from "../../../../controllers";
import { defaultConfig, defaultOptions, HTTPRequestBuilder } from "../../../data-access";

export default new Command("delete")
	.alias("rm")
	.description("Delete todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("--id <id>", "todo ID")
	.action((cmd) => {
		const requestBuilder = new HTTPRequestBuilder(defaultConfig);
		const handler = new DeleteTodoHandler(requestBuilder);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new DeleteTodoController(retriableHandler, { generate });

		return controller.handle(cmd)
	});
