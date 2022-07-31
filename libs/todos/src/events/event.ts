export interface Entity {
    id: string;
    [key: string]: any;
}

export interface DomainEvent<T extends Entity> {
    type: string;
    details: T;
    timestamp: number;
    stream: string;
}

export type Event = DomainEvent<Entity>;

export class Events extends Array<Event> {

    constructor(...items: Event[]) {
        super(...items);
    }

    public groupById() {
        return this.reduce((rv: { [key: string]: Events }, x: Event) => {
            (rv[x.details.id] = rv[x.details.id] || []).push(x);
            return rv;
        }, {});
    };
}