import MockTodoRepository from "../adapters/mock-todo.repository";
import TodoService from "../../../libs/todos/use-cases/interactor";
import HTTPResponsePresenter from "../adapters/http-response.presenter";
import RESTTodoController from "../adapters/rest-todo.controller";

import { Router } from "express";

const BASE_PATH = "/todos";

const repository = new MockTodoRepository()

const todoRouter = Router()

todoRouter.get(BASE_PATH, async (req: any, res: any, next: any) => {
    const response = new HTTPResponsePresenter(res)
    const useCase = new TodoService(response, repository);
    const controller = new RESTTodoController(useCase);

    try {
        return await controller.list(req)
    } catch (error) {
        next(error)
    }
})

export default todoRouter;
