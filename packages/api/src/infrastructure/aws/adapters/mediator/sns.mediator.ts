import { IMediator, Command } from "@todos/core";

import { SNS } from "aws-sdk";

export class SNSMediator implements IMediator {

	constructor(private readonly topicArn: string, private readonly sns: SNS) { }

	public async send(command: Command): Promise<void> {
		await this.sns
			.publish({
				TopicArn: this.topicArn,
				Message: JSON.stringify(command),
				MessageAttributes: {},
			})
			.promise();
	}
}
