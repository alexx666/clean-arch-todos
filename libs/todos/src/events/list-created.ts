import { List } from "../entities";

import Event from "./event";

export default class ListCreated implements Event<List> {

    public readonly type: string = "ListCreated";
    public readonly details: List;
    public readonly id: string;
    public readonly timestamp: number = Date.now();

    constructor(list: List) {
        this.details = list;
        this.id = list.id;
    }

}