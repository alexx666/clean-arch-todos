import { Router, NextFunction, Request, Response } from "express";
import { json } from "body-parser";

import { CreateTodo, CreateTodoRequest } from "@alexx666/todos";

export default function (createTodo: CreateTodo) {
	const createRouter = Router({ mergeParams: true })

	createRouter.post("/", json(), async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: CreateTodoRequest = { ...req.body, listName: decodeURI(req.params.listName) };
			const response = await createTodo.execute(request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	})

	return createRouter;
}
