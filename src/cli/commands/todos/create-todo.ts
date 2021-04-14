// Frameworks
import { Command } from "commander";

// Gatway Implementations
import RestTodoGateway from "../../../providers/todo-http.gateway";
import V4UuidGenerator from "../../../providers/v4-uuid";

// Use Case Implementations
import CreateTodoImpl from "../../../modules/todos/impl/create-todo.impl";

// Request/Response models
import { CreateTodoRequest } from "../../../modules/todos/boundry/create-todo";

const repository = new RestTodoGateway()
const generator = new V4UuidGenerator()

const createTodo = new CreateTodoImpl(repository, generator);

export default new Command("create")
    .alias("mk")
    .description("Create todo")
    .requiredOption("-d, --description <description>", "todo description")
    .requiredOption("-t, --due <due>", "todo due date in ISO format")
    .action(async cmd => {
        try {
            const request: CreateTodoRequest = { description: cmd.description, due: cmd.due };

            const result = await createTodo.execute(request);

            console.table(result)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
