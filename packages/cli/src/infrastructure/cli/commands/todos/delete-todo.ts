import { RetriableCommandHandler } from "@todos/core";
import { Command } from "commander";
import { randomUUID } from "crypto";

import { DeleteTodoController } from "../../../../controllers";
import { defaultConfig, defaultOptions, DeleteTodoHandler } from "../../../data-access";

export default new Command("delete")
	.alias("rm")
	.description("Delete todo")
	.requiredOption("-l, --list-name <list>", "List ID")
	.requiredOption("--id <id>", "todo ID")
	.action((cmd) => {
		const handler = new DeleteTodoHandler(defaultConfig);
		const retriableHandler = new RetriableCommandHandler(handler, defaultOptions);
		const controller = new DeleteTodoController(retriableHandler, { generate: randomUUID });

		return controller.handle(cmd)
	});
