export interface CommandParameters {
	id: string;
	[key: string]: any;
}

export interface Command<T extends CommandParameters = CommandParameters> {
	name: string;
	params: CommandParameters;
}

/**
 * An array of {@link Command} objects
 */
export class Commands extends Array<Command> {
	constructor(...items: Command[]) {
		super(...items);
	}

	/**
	 * Groups all events in the array by the UUID held by the {@link Entity} details
	 * @returns an object of where each key is the unique Id of the {@link Entity} details
	 * and the value is an array of all {@link Command} objects related to it
	 */
	public groupById() {
		return this.reduce((rv: { [key: string]: Commands }, x: Command) => {
			(rv[x.params.id] = rv[x.params.id] || []).push(x);
			return rv;
		}, {});
	}
}
