// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
    .alias("ls")
    .description("List todos")
    .requiredOption("-l, --list-name <list>", "name of the list to fetch")
    .option("--limit <limit>", "number of items to fetch", "20")
    .option("--marker <marker>", "cursor next show all items after this one", "0")
    .action(async cmd => {
        try {
            const request: ListTodosRequest = {
							listName: String(cmd.listName),
							limit: Number(cmd.limit),
							marker: String(cmd.marker)
						}

            const response = await listTodos.execute(request)

            console.table(response.items)
        } catch (error) {
            console.error("Error:", error.message);
						console.debug(error.stack)
        }
    });
}
