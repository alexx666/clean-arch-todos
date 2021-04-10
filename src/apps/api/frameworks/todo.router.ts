import { Router } from "express";

import MockTodoRepository from "../adapters/mock-todo.repository";
import ListTodos from "../../../libs/todos/use-cases/list-todos.interactor";
import RESTTodoController from "../adapters/rest-todo.controller";
import HTTPResponsePresenter from "../adapters/http-response.presenter";

const BASE_PATH = "/todos";

const repository = new MockTodoRepository()
const listTodos = new ListTodos(repository);
const controller = new RESTTodoController(listTodos);

const todoRouter = Router()

todoRouter.get(BASE_PATH, (req, res) => {
    listTodos.subscribe(new HTTPResponsePresenter(res))
    controller.list(req)
})

export default todoRouter;
