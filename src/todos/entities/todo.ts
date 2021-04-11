import EntityGateway from "../../core/entity.gateway";

export class Todo {
    constructor(public readonly id: string) {}
}

export interface TodoGateway extends EntityGateway<Todo> {}