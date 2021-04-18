import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

import Link from "../hateoas";

export default function(listTodos: ListTodos) {
	const listRouter = Router()

	listRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
			try {

					const { baseUrl, query, protocol, hostname, originalUrl } = req;

					const request: ListTodosRequest = {
						limit: Number(query.limit) || 20,
						marker: String(query.marker)
					}

					const { items, count } = await listTodos.execute(request)

					const links: Link[] = [
							{
							rel: "self",
							href: `${protocol}://${hostname}${originalUrl}`
						}
					];

					if (request.limit <= count) {
						const nextPage: any = { limit: query.limit };

						if (count > 0) nextPage.marker = items[count - 1].id

						links.push({
							rel: "next",
							href: `${protocol}://${hostname}${baseUrl}?${Object.entries(nextPage).map(e => e.join('=')).join('&')}`
						})
					}

					res.status(200).json({ items, count, links });
			} catch (error) {
					next(error)
			}
	})

	return listRouter;
}
