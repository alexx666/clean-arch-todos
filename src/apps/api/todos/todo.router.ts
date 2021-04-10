import { Router } from "express";

import QueryTodos from "../../../core/todos/use-cases/query-todos/query-todos.interactor.impl";
import InMemoryTodoRepository from "../adapters/mock-todo.repository";
import RESTQueryTodoController from "./todo.controller";

const BASE_PATH = "/todos";

const repository = new InMemoryTodoRepository()
const listTodos = new QueryTodos(repository);
const controller = new RESTQueryTodoController(listTodos);

const todoRouter = Router()

todoRouter.get(BASE_PATH, (req, res, next) => controller.list(req, res, next))

export default todoRouter;
