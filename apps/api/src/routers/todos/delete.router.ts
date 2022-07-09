import { Router, NextFunction, Request, Response } from "express";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default function (deleteTodo: DeleteTodo) {
	const deleteRouter = Router({ mergeParams: true })

	deleteRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: DeleteTodoRequest = { listName: req.params.name, id: Number(req.params.id) };
			const response = await deleteTodo.execute(request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	})

	return deleteRouter;
}

