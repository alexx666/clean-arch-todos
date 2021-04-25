export default class Todo {
    constructor(
			public readonly id: string,
			public readonly list: string,
			public readonly description: string,
			public readonly start: Date,
			public readonly end: Date
		) {
        if (!id) throw new Error("ValidationError: Id not provided!")
        if (!list) throw new Error("ValidationError: List not provided!")
        if (!description) throw new Error("ValidationError: Description not provided!")
        if (!start || !end) throw new Error("ValidationError: todo Timeline not defined!")
    }

		public get isExpired(): boolean {
			return Date.now() > this.end.getTime()
		}
}
