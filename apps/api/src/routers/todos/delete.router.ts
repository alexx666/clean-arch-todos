import { Router, NextFunction, Request, Response } from "express";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default function (deleteTodo: DeleteTodo) {
	const deleteRouter = Router({ mergeParams: true })

	deleteRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: DeleteTodoRequest = { listName: req.params.name, id: req.params.id };

			await deleteTodo.execute(request);

			res.status(201).json();
		} catch (error) {
			next(error);
		}
	})

	return deleteRouter;
}

