import { Router } from "express";

import { json } from "body-parser";

import InMemoryTodoGateway from "../../providers/todo-in-memory.gateway";

import TodoController from "./todo.controller";
import CreateTodoImpl from "../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../modules/todos/impl/list-todos.impl";

const repository = new InMemoryTodoGateway()
const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository);
const deleteTodo = new DeleteTodoImpl(repository);
const controller = new TodoController(listTodos, createTodo, deleteTodo);

const todoRouter = Router()

todoRouter.get("/", (req, res, next) => controller.list(req, res, next))
todoRouter.post("/", json(), (req, res, next) => controller.create(req, res, next))
todoRouter.delete("/:id", (req, res, next) => controller.delete(req, res, next))

export default todoRouter;
