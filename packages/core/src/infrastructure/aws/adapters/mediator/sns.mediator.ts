import { SNS } from "aws-sdk";

import { IMediator } from "../../../../ports";
import { Command } from "../../../../shared";
import { SNSConfig } from "../../config";

export class SNSMediator implements IMediator {

	private readonly sns: SNS;

	constructor(private readonly config: SNSConfig) {
		this.sns = new SNS();
	}

	public async send(command: Command): Promise<void> {
		await this.sns.publish({
			TopicArn: this.config.topic,
			Message: JSON.stringify(command),
			MessageAttributes: {}
		}).promise();
	}

}
