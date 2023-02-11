// TODO: refactor into config + factories

import { DynamoEventRepository, DynamoListRepository, DynamoListTodos, SNSMediator } from "@todos/core";

import { CryptoUuid } from "../util";

const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const endpoint = (urlPattern.test(String(process.env.AWS_ENDPOINT_URL)) ? process.env.AWS_ENDPOINT_URL : undefined);
const sslEnabled = endpoint === undefined;
const topic = String(process.env.SNS_TOPIC_ARN);
const table = String(process.env.DYNAMO_TABLE_NAME);

export const dynamoListRepo = new DynamoListRepository({ table, endpoint, sslEnabled });

export const snsMediator = new SNSMediator({ topic, endpoint, sslEnabled });

export const interactor = new DynamoListTodos({ table, endpoint, sslEnabled });

export const repository = new DynamoEventRepository({ table, endpoint, sslEnabled });

export const cryptoUuid = new CryptoUuid();

