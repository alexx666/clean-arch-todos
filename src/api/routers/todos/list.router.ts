import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

export default function(listTodos: ListTodos) {
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

	return listRouter;
}
