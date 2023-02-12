import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from "aws-lambda";

import { CreateList, CreateListParameters, ICreateListHandler } from "@todos/core";

import { idempotent, headers } from "../infrastructure/util";

export class CreateListController {
	constructor(private interactor: ICreateListHandler) { }

	@idempotent()
	public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
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

			await this.interactor.execute(new CreateList(request));
		} catch (error) {
			console.error(error);

			response.statusCode = 500; // FIXME: better error handling
			response.body = JSON.stringify({
				error: (error as Error).message,
			});
		}

		console.debug("Returning response to client:", response);

		return response;
	}
}
