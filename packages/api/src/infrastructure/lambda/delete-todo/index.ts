import { DeleteTodoHandler, IdempotencyCommandHandlerDecorator } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { DeleteTodoController } from "../../../controllers";

import { dynamoListRepo, snsMediator } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const deleteTodoInterator = new IdempotencyCommandHandlerDecorator(new DeleteTodoHandler(snsMediator, dynamoListRepo), defaultIdempotencyConfig);

export const handler = async (event: APIGatewayProxyEvent) =>
	new DeleteTodoController(deleteTodoInterator).handle(event);
