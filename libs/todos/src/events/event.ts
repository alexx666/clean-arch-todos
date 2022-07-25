export interface Event<T> {
    type: string;
    details: T;
    id: string;
    timestamp: number;
}

export class Events<T> extends Array<Event<T>> {

    constructor(...items: Event<T>[]) {
        super(...items);
    }

    public groupById() {
        return this.reduce((rv: { [key: string]: Events<T> }, x: Event<T>) => {
            (rv[x.id] = rv[x.id] || []).push(x);
            return rv;
        }, {});
    };
}