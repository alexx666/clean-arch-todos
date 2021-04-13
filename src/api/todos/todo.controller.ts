import { NextFunction, Request, Response } from "express";
import { CreateTodoRequest, CreateTodo } from "../../todos/boundry/create-todo";

import { ListTodos, ListTodosRequest } from "../../todos/boundry/list-todos";

export default class TodoController {
    constructor(private listTodos: ListTodos, private createTodo: CreateTodo) {}

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ListTodosRequest = { limit: Number(req.query.limit) || 20 }

            const result = await this.listTodos.execute(request)

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateTodoRequest;

            const result = await this.createTodo.execute(request);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}