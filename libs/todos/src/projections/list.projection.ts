import { List, ListParameters, Todo, TodoParameters } from "../entities";
import { TodoRemoved, ListCreated, ListDetails, TodoAdded, Events, Event } from "../events";

export default class ListProjection {

    public static from(events: Events<any> | Event<any>[]): ListProjection {
        return new ListProjection(events);
    }

    private constructor(private readonly events: Events<any> | Event<any>[]) { }

    public build(): List {
        const listParams: Partial<ListParameters> = {};

        for (const event of this.events) {
            switch (true) {
                case event instanceof ListCreated:

                    const listDetails = event.details as ListDetails;

                    listParams.name = listDetails.name;
                    listParams.allowDuplicates = listDetails.allowDuplicates;
                    listParams.allowExpired = listDetails.allowExpired;
                    listParams.maxTodos = listDetails.maxTodos;
                    listParams.todos = new Array();

                    break;

                case event instanceof TodoAdded:
                    const todoParams: TodoParameters = {
                        ...event.details,
                        startDate: new Date(event.details.startDate),
                        endDate: new Date(event.details.endDate)
                    }

                    listParams.todos?.push(new Todo(todoParams));

                    break;

                case event instanceof TodoRemoved:
                    listParams.todos = listParams.todos?.filter(todo => todo.id !== event.id);

                    break;

                default:
                    throw new Error("[StateBuilder] Error: Unable to build object state from event stream!");
            }
        }

        return new List(listParams as ListParameters);
    }
}