import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { DeleteTodoHandler } from "../../../application";
import { DeleteTodoController } from "../../../controllers";
import { cryptoUuid, dynamoListRepo, snsMediator } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const deleteTodoInterator = new IdempotentCommandHandler(new DeleteTodoHandler(snsMediator, dynamoListRepo, cryptoUuid), defaultIdempotencyConfig);

export const handler = async (event: APIGatewayProxyEvent) =>
	new DeleteTodoController(deleteTodoInterator).handle(event);
