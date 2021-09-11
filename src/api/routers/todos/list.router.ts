import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "../../../libs/todos/boundry/list-todos/list-todos";

export default function (listTodos: ListTodos) {
	const listRouter = Router({ mergeParams: true })

	listRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
		try {

			const { protocol, hostname, originalUrl, params } = req;

			const request: ListTodosRequest = {
				listName: String(params.name)
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
