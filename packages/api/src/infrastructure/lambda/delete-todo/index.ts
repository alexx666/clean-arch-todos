import { DeleteTodoHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { DeleteTodoController } from "../../../controllers";

import { dynamoListRepo, snsMediator } from "../../data-access";

const deleteTodoInterator = new DeleteTodoHandler(snsMediator, dynamoListRepo);

export const handler = async (event: APIGatewayProxyEvent) =>
	new DeleteTodoController(deleteTodoInterator).handle(event);
