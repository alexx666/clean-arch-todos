import { List } from "../entities";
import { Event } from "./event";

// FIXME: duplicated definition
export interface ListDetails {
    name: string,
    maxTodos: number,
    allowDuplicates: boolean;
    allowExpired: boolean;
}

export class ListCreated implements Event<ListDetails> {

    public readonly type: string = "ListCreated";
    public readonly details: ListDetails;
    public readonly id: string;
    public readonly timestamp: number = Date.now();
    public readonly stream: string;

    constructor(list: List) {
        this.id = list.listName;

        this.stream = this.stream = `List:${list.listName}`;

        this.details = {
            name: list.listName,
            maxTodos: list.policy.maxTodos,
            allowDuplicates: list.policy.allowDuplicates,
            allowExpired: list.policy.allowExpired,
        }
    }

}