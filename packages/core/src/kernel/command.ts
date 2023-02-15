export interface CommandParameters {
	[key: string]: any;
}

export interface Command {
	name: string;
	params: CommandParameters;
}
