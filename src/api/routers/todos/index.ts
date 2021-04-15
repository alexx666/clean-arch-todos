import { Router } from "express";

// Gatway Implementations
import InMemoryTodoGateway from "../../../providers/todo-in-memory.gateway";

// Use Case Implementations
import CreateTodoImpl from "../../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../../modules/todos/impl/list-todos.impl";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

const repository = new InMemoryTodoGateway()

export const createTodo = new CreateTodoImpl(repository);
export const deleteTodo = new DeleteTodoImpl(repository);
export const listTodos = new ListTodosImpl(repository);

const todoRouter = Router()

todoRouter.use(listRouter(listTodos))
todoRouter.use(createRouter(createTodo))
todoRouter.use(deleteRouter(deleteTodo))

export default todoRouter;
