import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateListHandler } from "../../../application";
import { CreateListController } from "../../../controllers";
import { snsMediator, dynamoListRepo, cryptoUuid } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const createListInteractor = new IdempotentCommandHandler(new CreateListHandler(snsMediator, dynamoListRepo, cryptoUuid), defaultIdempotencyConfig);

export const handler = async (event: APIGatewayProxyEvent) =>
	new CreateListController(createListInteractor).handle(event);
