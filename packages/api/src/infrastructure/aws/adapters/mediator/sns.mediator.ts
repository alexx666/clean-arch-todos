import { IMediator, Command } from "@todos/core";

import { SNS } from "aws-sdk";

import { SNSConfig } from "../../config";

export class SNSMediator implements IMediator {
	private readonly sns: SNS;

	constructor(private readonly config: SNSConfig) {
		console.log({ config });

		this.sns = new SNS({
			endpoint: config.endpoint,
			sslEnabled: config.sslEnabled,
		});
	}

	public async send(command: Command): Promise<void> {
		await this.sns
			.publish({
				TopicArn: this.config.topic,
				Message: JSON.stringify(command),
				MessageAttributes: {},
			})
			.promise();
	}
}
