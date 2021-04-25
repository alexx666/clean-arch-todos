// Frameworks
import { Command } from "commander";

import { DeleteTodo, DeleteTodoRequest } from "../../../modules/todos/boundry/delete-todo";

export default function (deleteTodo: DeleteTodo) {
	return new Command("delete")
    .alias("rm")
    .description("Delete todo")
    .requiredOption("-l, --list-name <list>", "List name")
    .requiredOption("--id <id>", "todo ID")
    .action(async cmd => {
        try {
            const request: DeleteTodoRequest = { listName: cmd.listName, id: cmd.id };

            const { item } = await deleteTodo.execute(request);

            console.table(item)
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}
