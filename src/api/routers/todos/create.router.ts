import { Router, NextFunction, Request, Response } from "express";
import { json } from "body-parser";

import { CreateTodo, CreateTodoRequest } from "../../../modules/todos/boundry/create-todo";

export default function(createTodo: CreateTodo) {
	const createRouter = Router()

	createRouter.post("/", json(), async (req: Request, res: Response, next: NextFunction) => {
			try {
					const request = req.body as CreateTodoRequest;
					const response = await createTodo.execute(request);

					res.status(200).json(response);
			} catch (error) {
					next(error);
			}
	})

	return createRouter;
}
