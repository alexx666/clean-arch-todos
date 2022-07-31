import { DynamoDB } from "aws-sdk";

import { List } from "../../entities";
import { Event } from "../../events";
import { ListRepository } from "../../ports";

export default class DynamoListRepository implements ListRepository {

    constructor(private readonly ddb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()) { }

    public async findById(id: string): Promise<List> {

        const { Items: events } = await this.ddb.query({
            TableName: String(process.env.DYNAMO_TABLE_NAME),
            KeyConditionExpression: '#stream = :stream',
            ExpressionAttributeValues: { ':stream': `List:${id}` },
            ExpressionAttributeNames: { "#stream": "stream" }
        }).promise();

        if (!events?.length) throw new Error("[DynamoListRepository] Error: List does not exist!");

        return List.buildFromStream(events as Event[]);
    }

}