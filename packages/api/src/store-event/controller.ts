import { Event } from "@alexx666/todos-core";
import { Handler, SQSEvent } from "aws-lambda";
import { StoreEventHandler } from "./store-event";

// TODO: event deduplication
export default (handler: StoreEventHandler): Handler => async (event: SQSEvent) => {
	const events = event.Records.map(record => JSON.parse(record.body) as Event);

	await handler.execute(events);
}
