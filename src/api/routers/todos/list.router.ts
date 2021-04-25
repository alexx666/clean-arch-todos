import { Router, NextFunction, Request, Response } from "express";

import { ListTodos, ListTodosRequest } from "../../../modules/todos/boundry/list-todos";

import Link from "../hateoas";

export default function(listTodos: ListTodos) {
	const listRouter = Router({ mergeParams: true })

	listRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
			try {

					const { baseUrl, query, protocol, hostname, originalUrl, params } = req;

					const request: ListTodosRequest = {
						listName: String(params.name),
						limit: Number(query.limit) || 20,
						marker: String(query.marker)
					}

					const response = await listTodos.execute(request)

					const { items, count } = response;

					const links: Link[] = [
						{ rel: "self", href: `${protocol}://${hostname}${originalUrl}` }
					];

					if (request.limit <= count) {
						const nextPage: any = { limit: query.limit };

						if (count > 0) nextPage.marker = items[count - 1].id

						const nextQueryParams = Object.entries(nextPage).map(e => e.join('=')).join('&')

						links.push({ rel: "next", href: `${protocol}://${hostname}${baseUrl}?${encodeURI(nextQueryParams)}`})
					}

					res.status(200).json({ ...response, links });
			} catch (error) {
					next(error)
			}
	})

	return listRouter;
}
