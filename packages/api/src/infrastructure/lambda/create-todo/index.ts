import { CreateTodoHandler, IdempotencyCommandHandlerDecorator } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateTodoController } from "../../../controllers";
import { dynamoListRepo, cryptoUuid, snsMediator } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const createTodoInteractor = new IdempotencyCommandHandlerDecorator(new CreateTodoHandler(
	dynamoListRepo,
	cryptoUuid,
	snsMediator
), defaultIdempotencyConfig);

export const handler = async (event: APIGatewayProxyEvent) =>
	new CreateTodoController(createTodoInteractor).handle(event);
