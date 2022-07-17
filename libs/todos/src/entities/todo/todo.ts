interface TodoParameters {
	id: string;
	description: string;
	startDate: Date;
	endDate: Date;
}

export default class Todo {

	public readonly id: string;
	public readonly description: string;
	public readonly startDate: Date;
	public readonly endDate: Date;

	constructor(params: TodoParameters) {

		const { id, description, startDate, endDate } = params;

		if (!id) throw new Error("ValidationError: ID not provided");
		if (!description) throw new Error("ValidationError: Description not provided!");
		if (!startDate || !endDate) throw new Error("ValidationError: todo Timeline not defined!");

		this.id = id;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public get isExpired(): boolean {
		return Date.now() > this.endDate.getTime()
	}
}
