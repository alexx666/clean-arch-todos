export interface ReadableGateway<T> {
    find(query: any): Promise<T[]>;
}

export interface WritableGateway<T> {
    save(item: T): Promise<T>;
    delete(id: string): Promise<T>;
}