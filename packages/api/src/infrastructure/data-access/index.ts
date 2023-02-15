/* eslint-disable no-useless-escape */
// TODO: refactor into config + factories

import {
	DynamoEventRepository,
	DynamoListRepository,
	DynamoListTodos,
	SNSMediator,
} from "@todos/core";

import { CryptoUuid } from "../util";

const urlPattern =
	/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const awsEndpointUrl = urlPattern.test(String(process.env.AWS_ENDPOINT_URL))
	? process.env.AWS_ENDPOINT_URL
	: undefined;
const sslEnabled = awsEndpointUrl === undefined;
const snsMediatorTopic = String(process.env.SNS_MEDIATOR_TOPIC_ARN);
const eventStoreTable = String(process.env.EVENT_STORE_TABLE_NAME);

export const dynamoListRepo = new DynamoListRepository({
	table: eventStoreTable,
	endpoint: awsEndpointUrl,
	sslEnabled,
});

export const snsMediator = new SNSMediator({
	topic: snsMediatorTopic,
	endpoint: awsEndpointUrl,
	sslEnabled,
});

export const interactor = new DynamoListTodos({
	table: eventStoreTable,
	endpoint: awsEndpointUrl,
	sslEnabled,
});

export const repository = new DynamoEventRepository({
	table: eventStoreTable,
	endpoint: awsEndpointUrl,
	sslEnabled,
});

export const cryptoUuid = new CryptoUuid();
