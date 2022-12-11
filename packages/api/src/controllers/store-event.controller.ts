import { Event } from "@todos/core";
import { Handler, SQSEvent } from "aws-lambda";
import { StoreEventHandler } from "../application/store-event";

// TODO: event deduplication
export default (interactor: StoreEventHandler): Handler => async (event: SQSEvent) => {
	const events = event.Records.map(record => JSON.parse(record.body) as Event);

	await interactor.execute(events);
}
