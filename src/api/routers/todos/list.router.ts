import { Router, NextFunction, Request, Response } from "express";

import { ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

import { listTodos } from "./loader";

const listRouter = Router()

listRouter.get("/todos", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request: ListTodosRequest = { limit: Number(req.query.limit) || 20 }
        const response = await listTodos.execute(request)

        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})

export default listRouter;