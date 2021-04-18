import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

import Link from "../hateoas";

function convertToQueryParams(obj: any) {
	return Object.entries(obj).map(e => e.join('=')).join('&')
}

export default function(listTodos: ListTodos) {
	const listRouter = Router()

	listRouter.get("/todos", async (req: Request, res: Response, next: NextFunction) => {
			try {

					const URI = `http://${process.env.HOST}:${process.env.PORT}/todos`

					const request: ListTodosRequest = {
						limit: Number(req.query.limit) || 20,
						marker: String(req.query.marker)
					}

					const { items, count } = await listTodos.execute(request)

					const links: Link[] = [
							{
							rel: "self",
							href: `${URI}?${convertToQueryParams(req.query)}`
						}
					];

					if (request.limit <= count) {
						const nextPage: any = { limit: req.query.limit };

						if (count > 0) nextPage.marker = items[count - 1].id

						links.push({
							rel: "next",
							href: `${URI}?${convertToQueryParams(nextPage)}`
						})
					}

					res.status(200).json({ items, count, links });
			} catch (error) {
					next(error)
			}
	})

	return listRouter;
}
