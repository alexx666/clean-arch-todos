import { Name } from "../../value-objects";

interface TodoParameters {
	id: string;
	description: string;
	startDate: Date;
	endDate: Date;
	listName: string;
}

export default class Todo {

	public readonly id: string;
	public readonly description: string;
	public readonly startDate: Date;
	public readonly endDate: Date;
	public readonly listName: string;

	constructor(params: TodoParameters) {

		const { id, description, startDate, endDate, listName } = params;

		this.listName = listName;

		if (!id) throw new Error("ValidationError: ID not provided");

		this.id = id;

		if (!description) throw new Error("ValidationError: Description not provided!");

		this.description = description;

		if (!startDate || !endDate) throw new Error("ValidationError: todo Timeline not defined!");

		this.startDate = startDate;
		this.endDate = endDate;
	}

	public get isExpired(): boolean {
		return Date.now() > this.endDate.getTime()
	}
}
