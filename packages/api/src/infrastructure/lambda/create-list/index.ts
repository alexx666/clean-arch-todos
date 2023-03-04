import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDB, SNS } from "aws-sdk";

import { CreateListHandler } from "../../../application";
import { CreateListController } from "../../../controllers";
import { DynamoDBCache, DynamoListRepository, SNSMediator } from "../../aws";
import { awsConfig, dynamoIdempotencyCacheTable, eventStoreTable, snsMediatorTopic } from "../../config";
import { CryptoUuid } from "../../util";

const sns = new SNS(awsConfig);
const dynamoDocumentClient = new DynamoDB.DocumentClient(awsConfig)

const dynamoListRepo = new DynamoListRepository(eventStoreTable, dynamoDocumentClient);
const snsMediator = new SNSMediator(snsMediatorTopic, sns);
const cache = new DynamoDBCache(dynamoIdempotencyCacheTable);
const cryptoUuid = new CryptoUuid();

const interactor = new CreateListHandler(snsMediator, dynamoListRepo, cryptoUuid);
const idempotentInteractor = new IdempotentCommandHandler(interactor, cache);
const controller = new CreateListController(idempotentInteractor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
