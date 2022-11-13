
export interface CommandParameters {
	[key: string]: boolean | string | number | undefined;
}

export interface Command {
	name: string;
	params: CommandParameters;
}
