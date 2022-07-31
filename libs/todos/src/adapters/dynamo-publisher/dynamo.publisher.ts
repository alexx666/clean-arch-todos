import { DynamoDB } from "aws-sdk";

import { Event } from "../../events";
import { EventPublisher } from "../../ports";

export default class DynamoEventPublisher implements EventPublisher {

    constructor(private readonly ddb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()) { }

    // TODO: infrastructure error handling
    public async publish(event: Event): Promise<void> {
        await this.ddb.put({
            TableName: String(process.env.DYNAMO_TABLE_NAME),
            Item: event,
        }).promise()
    }

}