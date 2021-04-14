// Frameworks
import { Command } from "commander";

// Gatway Implementations
import RestTodoGateway from "../../../providers/todo-http.gateway";

// Use Case Implementations
import DeleteTodoImpl from "../../../modules/todos/impl/delete-todo.impl";

// Request/Response models
import { DeleteTodoRequest } from "../../../modules/todos/boundry/delete-todo";

const repository = new RestTodoGateway()

const deleteTodo = new DeleteTodoImpl(repository);

export default new Command("delete")
    .alias("rm")
    .description("Delete todo")
    .requiredOption("--id <id>", "todo ID")
    .action(async cmd => {
        try {
            const request: DeleteTodoRequest = { id: cmd.id };

            const { item } = await deleteTodo.execute(request);

            console.table(item)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
