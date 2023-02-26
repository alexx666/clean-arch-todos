import { SQSEvent } from "aws-lambda";

import { StoreEventController } from "../../../controllers";
import { StoreEventHandler } from "../../../application";
import { repository } from "../../data-access";

const interactor = new StoreEventHandler(repository);
const controller = new StoreEventController(interactor);

export const handler = async (event: SQSEvent) => controller.handle(event);
