import { APIGatewayProxyEvent } from "aws-lambda";

import { ListTodosController } from "../../../controllers";
import { interactor } from "../../data-access";

const controller = new ListTodosController(interactor);

export const handler = async (event: APIGatewayProxyEvent) => controller.handle(event);
