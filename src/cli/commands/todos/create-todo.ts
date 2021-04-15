// Frameworks
import { Command } from "commander";

// Request/Response models
import { CreateTodo, CreateTodoRequest } from "../../../modules/todos/boundry/create-todo";

export default function (createTodo: CreateTodo) {
	return new Command("create")
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
}
