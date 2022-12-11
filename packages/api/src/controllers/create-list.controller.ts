import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import headers from "./cors-headers";

import { CreateList, CreateListParameters, ICreateListHandler } from "@todos/core";

export default (interactor: ICreateListHandler): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const response: APIGatewayProxyResult = {
			statusCode: 201,
			body: "",
			headers,
		};

		try {
			if (!event.body) throw new Error("Request has no body!");

			const body = JSON.parse(event.body) as CreateListParameters;

			const request = {
				listName: body.listName,
				maxTodos: body.maxTodos ?? 10,
				allowDuplicates: body.allowDuplicates ?? false,
				allowExpired: body.allowExpired ?? true,
			} as CreateListParameters;

			await interactor.execute(new CreateList(request));
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
