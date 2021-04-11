import { Router } from "express";

import InMemoryTodoGateway from "../../geteways/in-memory.todos";
import ListTodos from "../../todos/interactors/list-todos.impl";

import TodoController from "./todo.controller";

const BASE_PATH = "/todos";

const repository = new InMemoryTodoGateway()
const listTodos = new ListTodos(repository);
const controller = new TodoController(listTodos);

const todoRouter = Router()

todoRouter.get(BASE_PATH, (req, res, next) => controller.list(req, res, next))

export default todoRouter;
