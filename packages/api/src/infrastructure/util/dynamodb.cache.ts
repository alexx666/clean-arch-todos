import { DynamoDB } from "aws-sdk";
import { CacheEntry, IdempotencyCache } from "./idempotency-cache";

export class DynamoDBCache implements IdempotencyCache {

	constructor(private tableName: string, private dynamoDbDocumentClient = new DynamoDB.DocumentClient()) { }

	public async get(id: string): Promise<CacheEntry | undefined> {
		const { Item } = await this.dynamoDbDocumentClient.get({
			TableName: this.tableName,
			Key: { id },
		}).promise();

		return Item as CacheEntry;
	}

	public async lock(id: string): Promise<void> {

		const NOW = Math.floor(Date.now() / 1000);
		const ONE_HOUR = 60 * 60;
		const THIRTY_SECONDS = 30;

		await this.dynamoDbDocumentClient.put({
			TableName: this.tableName,
			Item: {
				id,
				timeout: NOW + THIRTY_SECONDS,
				expiration: NOW + ONE_HOUR,
			}
		}).promise();
	}

	public async update(id: string, item: any): Promise<void> {
		await this.dynamoDbDocumentClient.update({
			TableName: this.tableName,
			Key: { id },
			UpdateExpression: "SET #r = :r",
			ExpressionAttributeNames: { "#r": "response" },
			ExpressionAttributeValues: { ":r": item }
		}).promise();
	}
}
