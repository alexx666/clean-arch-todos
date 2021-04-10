import { NextFunction, Request, Response } from "express";

import QueryTodosInteractor from "../../../core/todos/use-cases/query-todos/query-todos.interactor";

export default class QueryTodoController {
    constructor(private queryTodos: QueryTodosInteractor) {}

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.queryTodos.list({ limit: Number(req.query.limit) || 20 })

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}