import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

import { ListTodosController } from "../../../controllers";
import { DynamoListTodos } from "../../aws";
import { awsConfig, eventStoreTable } from "../../config";

const dynamoDocumentClient = new DynamoDB.DocumentClient(awsConfig);
const interactor = new DynamoListTodos(eventStoreTable, dynamoDocumentClient);
const controller = new ListTodosController(interactor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
