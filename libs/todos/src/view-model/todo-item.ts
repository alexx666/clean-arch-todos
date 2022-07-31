import { Event, Events, TodoAdded, TodoDetails, TodoRemoved } from "../events";

interface TodoItemParameters {
    id: string;
    start: string;
    end: string;
    expired: boolean;
    description: string;
    isDeleted: boolean;
}

export default class TodoItem {

    public readonly id: string;
    public readonly start: string;
    public readonly end: string;
    public readonly expired: boolean;
    public readonly description: string;
    public readonly isDeleted: boolean;

    private constructor(params: TodoItemParameters) {
        this.id = params.id;
        this.start = params.start;
        this.end = params.end;
        this.expired = params.expired;
        this.description = params.description;
        this.isDeleted = params.isDeleted;
    }

    public static buildFromStream(events: Events<any> | Event<any>[]): TodoItem {
        const params: Partial<TodoItemParameters> = {};

        for (const event of events) {

            switch (true) {
                case event.type === "TodoAdded":

                    const details = event.details as TodoDetails;

                    params.id = event.id;
                    params.description = details.description;
                    params.start = details.startDate;
                    params.end = details.endDate;
                    params.expired = Date.now() > new Date(details.endDate).getTime();

                    params.isDeleted = false;

                    break;

                case event.type === "TodoRemoved":
                    params.isDeleted = true;

                    break;

                default:
                    throw new Error("[TodoItem] Error: Unable to build object state from event stream!");
            }
        }

        return new TodoItem(params as TodoItemParameters);
    }
}