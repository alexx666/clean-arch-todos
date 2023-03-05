// Frameworks
import { Command } from "commander";
import { randomUUID as generate } from "crypto";

// Request/Response models
import { ListTodos } from "../../../../application";
import { ListTodosController } from "../../../../controllers";
import { defaultConfig, HTTPClient } from "../../../http";

export default new Command("list")
	.alias("ls")
	.description("List todos")
	.requiredOption("-l, --list-id <listId>", "List ID")
	.action((cmd) => {
		const client = new HTTPClient(defaultConfig);
		const handler = new ListTodos(client, { generate });
		const controller = new ListTodosController(handler);

		return controller.handle(cmd)
	});

