import { CreateListHandler, IdempotencyCommandHandlerDecorator } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateListController } from "../../../controllers";
import { snsMediator, dynamoListRepo } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const createListInteractor = new IdempotencyCommandHandlerDecorator(new CreateListHandler(snsMediator, dynamoListRepo), defaultIdempotencyConfig);

export const handler = async (event: APIGatewayProxyEvent) =>
	new CreateListController(createListInteractor).handle(event);
