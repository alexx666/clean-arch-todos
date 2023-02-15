import { Event } from "@todos/core";
import { SQSEvent } from "aws-lambda";
import { StoreEventHandler } from "../application/store-event";

// TODO: event deduplication
export class StoreEventController {
	constructor(private interactor: StoreEventHandler) {}

	public async handle(event: SQSEvent) {
		const events = event.Records.map(
			(record) => JSON.parse(record.body) as Event
		);

		await this.interactor.execute(events);
	}
}
