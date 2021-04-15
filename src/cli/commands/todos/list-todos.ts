// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
    .alias("ls")
    .description("List todos")
    .option("--limit <limit>", "number of items to fetch", "20")
    .option("--skip <skip>", "number of items to skip", "0")
    .action(async cmd => {
        try {
            const request: ListTodosRequest = {
							limit: Number(cmd.limit),
							skip: Number(cmd.skip)
						}

            const response = await listTodos.execute(request)

            console.table(response.items)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}
