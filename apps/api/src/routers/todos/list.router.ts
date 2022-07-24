import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "@alexx666/todos";

export default function (listTodos: ListTodos) {
	const listRouter = Router({ mergeParams: true })

	listRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
		try {

			const { protocol, hostname, originalUrl, params } = req;

			const request: ListTodosRequest = {
				listId: String(params.listId)
			}

			const response = await listTodos.execute(request)

			res.status(200).json({
				...response,
				links: [
					{ rel: "self", href: `${protocol}://${hostname}${originalUrl}` }
				]
			});
		} catch (error) {
			next(error)
		}
	})

	return listRouter;
}
