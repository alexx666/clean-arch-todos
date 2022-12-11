// Frameworks
import { Command } from "commander";
import { container } from "tsyringe";

// Request/Response models
import { ListTodosController } from "../../../../controllers";

export default new Command("list")
	.alias("ls")
	.description("List todos")
	.requiredOption("-l, --list-name <list>", "List ID")
	.action((cmd) => container.resolve(ListTodosController).handle(cmd));

