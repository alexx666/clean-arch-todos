import { Router, NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { CreateList, CreateListRequest } from "../../../libs/todos/boundry/create-list/create-list";

export default function (createTodo: CreateList) {
	const createRouter = Router({ mergeParams: true })

	createRouter.post("/", json(), async (req: Request, res: Response, next: NextFunction) => {

		try {
			const request: CreateListRequest = { listName: req.body.name };
			await createTodo.execute(request);

			res.status(200).json();
		} catch (error) {
			next(error);
		}
	})

	return createRouter;
}
