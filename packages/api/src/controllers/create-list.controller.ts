import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from "aws-lambda";

import headers from "./cors-headers";

import { CreateList, CreateListParameters, ICreateListHandler } from "@todos/core";
import { DynamoDB } from "aws-sdk";

const ONE_HOUR = 60 * 60;
const THIRTY_SECONDS = 30;

export default (interactor: ICreateListHandler): Handler =>
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		console.debug("Event:", event);

		const requestId = event.headers["X-Request-Id"];

		const response: APIGatewayProxyResult = {
			statusCode: 201,
			body: "",
			headers,
		};

		// REVIEW: idempotency

		const dynamoDbDocumentClient = new DynamoDB.DocumentClient();
		const idempotencyTable = String(process.env.IDEMPOTENCY_TABLE_NAME);

		const { Item: cachedRequest } = await dynamoDbDocumentClient.get({
			TableName: idempotencyTable,
			Key: { id: requestId },
		}).promise();

		console.debug("Cached request:", cachedRequest);

		const requestResponded = !!cachedRequest && !!cachedRequest.response;
		const requestInProgress = !!cachedRequest && !cachedRequest.response && cachedRequest.timeout < Date.now();

		if (requestResponded) {
			console.debug("Returning cached response:", cachedRequest.response);
			return cachedRequest.response;
		}

		if (requestInProgress) {
			console.debug("Returning 'request in progress' to client");
			return {
				statusCode: 400, // TODO: set correct HTTP response
				body: JSON.stringify({ error: "Request already in progress!" }),
				headers,
			}
		}

		console.debug("Locking request:", requestId);

		const NOW = Math.floor(Date.now() / 1000);

		await dynamoDbDocumentClient.put({
			TableName: idempotencyTable,
			Item: {
				id: requestId,
				timeout: NOW + THIRTY_SECONDS,
				expiration: NOW + ONE_HOUR,
			}
		}).promise();

		// REVIEW: idempotency end

		console.debug("Handeling request:", requestId);

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

		console.debug("Caching reponse for request:", requestId);

		// REVIEW: idempotency

		await dynamoDbDocumentClient.update({
			TableName: idempotencyTable,
			Key: {
				id: requestId
			},
			UpdateExpression: "SET #r = :r",
			ExpressionAttributeNames: { "#r": "response" },
			ExpressionAttributeValues: { ":r": response }
		}).promise();

		// REVIEW: idempotency end

		console.debug("Returning response to client:", response);

		return response;
	};
