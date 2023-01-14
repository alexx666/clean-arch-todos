export interface DynamoConfig {
	table: string;
	endpoint?: string;
	sslEnabled?: boolean;
}

export interface SNSConfig {
	topic: string;
}
