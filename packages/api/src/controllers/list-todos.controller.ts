import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import headers from "./cors-headers";

import { IListTodos, ListTodosRequest } from "@todos/core";

export default (interactor: IListTodos): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 200,
			headers,
			body: "",
		};

		try {
			const { pathParameters: params, path } = event;

			if (!params?.listId) throw new Error("Request has no path parameters!");

			const request: ListTodosRequest = {
				listName: String(params.listId),
			};

			const result = await interactor.execute(request);

			response.body = JSON.stringify({
				...result,
				links: [{ rel: "self", href: `${path}` }],
			});
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		console.debug("Response:", response);

		return response;
	};
