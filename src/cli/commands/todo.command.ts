// Frameworks
import { Command } from "commander";

// Gatway Implementations
import RestTodoGateway from "../../providers/todo-http.gateway";
import V4UuidGenerator from "../../providers/v4-uuid";

// Use Case Implementations
import CreateTodoImpl from "../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../modules/todos/impl/list-todos.impl";

// Request/Response models
import { ListTodosRequest } from "../../modules/todos/boundry/list-todos";
import { CreateTodoRequest } from "../../modules/todos/boundry/create-todo";
import { DeleteTodoRequest } from "../../modules/todos/boundry/delete-todo";

const repository = new RestTodoGateway()
const generator = new V4UuidGenerator()

const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository, generator);
const deleteTodo = new DeleteTodoImpl(repository);

const todosCommand = new Command("todos");

todosCommand.command("list")
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

todosCommand.command("create")
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

todosCommand.command("delete")
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

export default todosCommand;