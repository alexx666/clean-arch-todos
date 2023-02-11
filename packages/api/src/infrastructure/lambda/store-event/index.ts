import { storeEvent } from "../../../controllers";
import { StoreEventHandler } from "../../../application";
import { repository } from "../../data-access";


const interactor = new StoreEventHandler(repository);

export const handler = storeEvent(interactor);
