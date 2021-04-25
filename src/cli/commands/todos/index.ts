// Frameworks
import { Command } from "commander";

// Use Case implementations
import CreateTodoImpl from "../../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../../modules/todos/impl/list-todos.impl";

// Providers
import RestTodoGateway from "../../../providers/todo-http/todo-http.gateway";
import V4UuidGenerator from "../../../providers/uuid/v4-uuid";

// Subcommands
import listCmd from "./list-todos";
import createCmd from "./create-todo";
import deleteCmd from "./delete-todo";

// config
import config from "../../config";

const todoGateway = new RestTodoGateway(config)
const uuidGenerator = new V4UuidGenerator()

const listTodos = new ListTodosImpl(todoGateway)
const createTodo = new CreateTodoImpl(todoGateway, uuidGenerator)
const deleteTodo = new DeleteTodoImpl(todoGateway)

const todosCommand = new Command("todos");

todosCommand.addCommand(listCmd(listTodos))
todosCommand.addCommand(createCmd(createTodo))
todosCommand.addCommand(deleteCmd(deleteTodo))

export default todosCommand;
