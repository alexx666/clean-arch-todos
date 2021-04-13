import { Command } from "commander";

import RestTodoGateway from "../../providers/todo-http.gateway";
import TodoController from "./todo.controller";
import V4UuidGenerator from "../../providers/v4-uuid";
import CreateTodoImpl from "../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../modules/todos/impl/list-todos.impl";

const repository = new RestTodoGateway()
const generator = new V4UuidGenerator()
const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository, generator);
const deleteTodo = new DeleteTodoImpl(repository);
const controller = new TodoController(listTodos, createTodo, deleteTodo);

const todosCommand = new Command("todos");

todosCommand.command("list")
    .alias("ls")
    .description("List todos")
    .option("-l, --limit <limit>", "number of items to fetch", "20")
    .action(cmd => controller.list(cmd));

todosCommand.command("create")
    .alias("mk")
    .description("Create todo")
    .requiredOption("-d, --description <description>", "todo description")
    .requiredOption("-t, --due <due>", "todo due date in ISO format")
    .action(cmd => controller.create(cmd));

todosCommand.command("delete")
    .alias("rm")
    .description("Delete todo")
    .requiredOption("--id <id>", "todo ID")
    .action(cmd => controller.delete(cmd));

export default todosCommand;