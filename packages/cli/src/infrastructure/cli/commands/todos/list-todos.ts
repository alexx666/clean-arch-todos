// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodosController } from "../../../../controllers";
import { defaultConfig, ListTodos } from "../../../data-access";

export default new Command("list")
	.alias("ls")
	.description("List todos")
	.requiredOption("-l, --list-name <list>", "List ID")
	.action((cmd) => new ListTodosController(new ListTodos(defaultConfig)).handle(cmd));

