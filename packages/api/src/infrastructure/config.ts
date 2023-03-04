/* eslint-disable no-useless-escape */

const urlPattern =
	/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const awsEndpointUrl = urlPattern.test(String(process.env.AWS_ENDPOINT_URL))
	? process.env.AWS_ENDPOINT_URL
	: undefined;

export const awsConfig = {
	endpoint: awsEndpointUrl,
	sslEnabled: awsEndpointUrl === undefined,
}

export const snsMediatorTopic = String(process.env.SNS_MEDIATOR_TOPIC_ARN);
export const eventStoreTable = String(process.env.EVENT_STORE_TABLE_NAME);
export const dynamoIdempotencyCacheTable = String(process.env.DYNAMO_IDEMPOTENCY_TABLE_NAME);
