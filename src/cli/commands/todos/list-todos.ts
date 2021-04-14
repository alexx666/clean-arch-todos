// Frameworks
import { Command } from "commander";

// Gatway Implementations
import RestTodoGateway from "../../../providers/todo-http.gateway";

// Use Case Implementations
import ListTodosImpl from "../../../modules/todos/impl/list-todos.impl";

// Request/Response models
import { ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

const repository = new RestTodoGateway()

const listTodos = new ListTodosImpl(repository);

export default new Command("list")
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
