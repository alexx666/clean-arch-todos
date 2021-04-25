// Frameworks
import { Command } from "commander";

// Request/Response models
import { CreateTodo, CreateTodoRequest } from "../../../modules/todos/boundry/create-todo";

export default function (createTodo: CreateTodo) {
	return new Command("create")
    .alias("mk")
    .description("Create todo")
    .requiredOption("-l, --list-name <listName>", "todo list name")
    .requiredOption("-d, --description <description>", "todo description")
    .requiredOption("-s, --start <start>", "todo start date in ISO format")
    .requiredOption("-e, --end <end>", "todo end date in ISO format")
    .action(async cmd => {
        try {
            const request: CreateTodoRequest = {
							listName: cmd.listName,
							description: cmd.description,
							start: cmd.start,
							end: cmd.end
						};

            const result = await createTodo.execute(request);

            console.table(result)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}
