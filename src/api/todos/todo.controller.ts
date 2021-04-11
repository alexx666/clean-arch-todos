import { NextFunction, Request, Response } from "express";

import { IListTodos, ListTodosRequest } from "../../todos/boundry/list-todos";

export default class TodoController {
    constructor(private listTodos: IListTodos) {}

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ListTodosRequest = { limit: Number(req.query.limit) || 20 }

            const result = await this.listTodos.execute(request)

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}