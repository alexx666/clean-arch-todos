export default class Todo {
	constructor(
		public readonly description: string,
		public readonly start: Date,
		public readonly end: Date
	) {
		if (!description) throw new Error("ValidationError: Description not provided!")
		if (!start || !end) throw new Error("ValidationError: todo Timeline not defined!")
	}

	public get isExpired(): boolean {
		return Date.now() > this.end.getTime()
	}
}
