import { CreateListHandler } from "@todos/core";
import { APIGatewayProxyEvent } from "aws-lambda";

import { CreateListController } from "../../../controllers";
import { snsMediator, dynamoListRepo } from "../../data-access";

const createListInteractor = new CreateListHandler(snsMediator, dynamoListRepo)

export const handler = async (event: APIGatewayProxyEvent) => new CreateListController(createListInteractor).handle(event);
