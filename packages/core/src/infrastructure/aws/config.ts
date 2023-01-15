export interface AWSClientConfig {
	endpoint?: string;
	sslEnabled?: boolean;
}

export interface DynamoConfig extends AWSClientConfig {
	table: string;
}

export interface SNSConfig extends AWSClientConfig {
	topic: string;
}
