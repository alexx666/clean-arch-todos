import { Router } from "express";

import { json } from "body-parser";

import InMemoryTodoGateway from "../../geteways/in-memory.todos";
import CreateTodoImpl from "../../todos/impl/create-todo.impl";
import ListTodosImpl from "../../todos/impl/list-todos.impl";

import TodoController from "./todo.controller";

const repository = new InMemoryTodoGateway()
const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository);
const controller = new TodoController(listTodos, createTodo);

const todoRouter = Router()

todoRouter.get("/", (req, res, next) => controller.list(req, res, next))
todoRouter.post("/", json(), (req, res, next) => controller.create(req, res, next))

export default todoRouter;
