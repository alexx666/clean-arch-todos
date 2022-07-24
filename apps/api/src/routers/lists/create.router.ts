import { Router, NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { CreateList, CreateListRequest } from "@alexx666/todos";

export default function (createTodo: CreateList) {
	const createRouter = Router({ mergeParams: true })

	createRouter.post("/", json(), async (req: Request, res: Response, next: NextFunction) => {

		try {
			const request: CreateListRequest = {
				id: req.body.id,
				listName: req.body.name,
				maxTodos: req.body.maxTodos ?? 10,
				allowDuplicates: req.body.allowDuplicates ?? false
			};

			await createTodo.execute(request);

			res.status(201).json();
		} catch (error) {
			next(error);
		}
	})

	return createRouter;
}
