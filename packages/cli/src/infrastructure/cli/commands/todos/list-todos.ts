// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos } from "../../../../application";
import { ListTodosController } from "../../../../controllers";
import { defaultConfig, HTTPRequestBuilder } from "../../../data-access";

export default new Command("list")
	.alias("ls")
	.description("List todos")
	.requiredOption("-l, --list-name <list>", "List ID")
	.action((cmd) => {
		const requestBuilder = new HTTPRequestBuilder(defaultConfig);
		const handler = new ListTodos(requestBuilder);
		const controller = new ListTodosController(handler);

		return controller.handle(cmd)
	});

