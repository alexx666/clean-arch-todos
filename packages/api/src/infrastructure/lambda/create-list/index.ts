import { IdempotentCommandHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateListHandler } from "../../../application";
import { CreateListController } from "../../../controllers";
import { snsMediator, dynamoListRepo, cryptoUuid } from "../../data-access";
import { defaultIdempotencyConfig } from "../../util";

const interactor = new CreateListHandler(snsMediator, dynamoListRepo, cryptoUuid);
const idempotentInteractor = new IdempotentCommandHandler(interactor, defaultIdempotencyConfig);
const controller = new CreateListController(idempotentInteractor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
