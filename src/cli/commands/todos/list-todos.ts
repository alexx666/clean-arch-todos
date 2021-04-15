// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(async cmd => {
        try {
            const request: ListTodosRequest = { limit: cmd.limit }

            const response = await listTodos.execute(request)

            console.table(response.items)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}
