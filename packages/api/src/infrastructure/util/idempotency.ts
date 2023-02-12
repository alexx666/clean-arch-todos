import { DynamoDB } from "aws-sdk";

// REVIEW: generalize by providing parameters
// TODO: handle timedout requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idempotent = () => (_: any, __: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {

		const ONE_HOUR = 60 * 60;
		const THIRTY_SECONDS = 30;

		const requestId = args[0].headers["X-Request-Id"];

		console.debug("Received request:", requestId);

		const dynamoDbDocumentClient = new DynamoDB.DocumentClient();
		const idempotencyTable = String(process.env.IDEMPOTENCY_TABLE_NAME);

		const { Item: cachedRequest } = await dynamoDbDocumentClient.get({
			TableName: idempotencyTable,
			Key: { id: requestId },
		}).promise();

		console.debug("Request cached:", !!cachedRequest);

		const requestResponded = !!cachedRequest && !!cachedRequest.response;

		if (requestResponded) {
			console.debug("Returning cached response:", cachedRequest.response);
			return cachedRequest.response;
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

		console.debug("Handeling request:", requestId);

		const response = await originalMethod.apply(this, args);

		await dynamoDbDocumentClient.update({
			TableName: idempotencyTable,
			Key: {
				id: requestId
			},
			UpdateExpression: "SET #r = :r",
			ExpressionAttributeNames: { "#r": "response" },
			ExpressionAttributeValues: { ":r": response }
		}).promise();

		return response;
	}
};
