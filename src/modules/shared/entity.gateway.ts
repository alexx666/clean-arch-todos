export interface ReadableGateway<T> {
    find(query: any): Promise<T[]>;
		count(query: any): Promise<number>;
}

export interface WritableGateway<T> {
    save(item: T): Promise<T>;
    delete(list: string, id: string): Promise<T>;
}

export interface Gateway<T> extends ReadableGateway<T>, WritableGateway<T> {}
