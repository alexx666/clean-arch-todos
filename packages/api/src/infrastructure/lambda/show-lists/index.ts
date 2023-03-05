import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { ShowListsController } from "packages/api/src/controllers";

import { DynamoShowLists } from "../../aws";
import { awsConfig, eventStoreTable } from "../../config";

const dynamoDocumentClient = new DynamoDB.DocumentClient(awsConfig);
const interactor = new DynamoShowLists(eventStoreTable, dynamoDocumentClient);
const controller = new ShowListsController(interactor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
