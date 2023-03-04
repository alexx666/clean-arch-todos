import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDB, SNS } from "aws-sdk";

import { DeleteTodoHandler } from "../../../application";
import { DeleteTodoController } from "../../../controllers";
import { DynamoDBCache, DynamoListRepository, SNSMediator } from "../../aws";
import { awsConfig, dynamoIdempotencyCacheTable, eventStoreTable, snsMediatorTopic } from "../../config";
import { CryptoUuid } from "../../util";

export const dynamoDocumentClient = new DynamoDB.DocumentClient(awsConfig)
export const sns = new SNS(awsConfig)

export const dynamoListRepo = new DynamoListRepository(eventStoreTable, dynamoDocumentClient);
export const snsMediator = new SNSMediator(snsMediatorTopic, sns);
export const cache = new DynamoDBCache(dynamoIdempotencyCacheTable);

export const cryptoUuid = new CryptoUuid();

const interactor = new DeleteTodoHandler(snsMediator, dynamoListRepo, cryptoUuid);
const idempotentInterractor = new IdempotentCommandHandler(interactor, cache);
const controller = new DeleteTodoController(idempotentInterractor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
