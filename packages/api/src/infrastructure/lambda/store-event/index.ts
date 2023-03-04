import { DynamoDB } from "aws-sdk";
import { SQSEvent } from "aws-lambda";

import { StoreEventController } from "../../../controllers";
import { StoreEventHandler } from "../../../application";
import { DynamoEventRepository } from "../../aws";
import { awsConfig, eventStoreTable } from "../../config";

const dynamoDocumentClient = new DynamoDB.DocumentClient(awsConfig);

const repository = new DynamoEventRepository(eventStoreTable, dynamoDocumentClient)
const interactor = new StoreEventHandler(repository);
const controller = new StoreEventController(interactor);

export const handler = async (event: SQSEvent) => controller.handle(event);
