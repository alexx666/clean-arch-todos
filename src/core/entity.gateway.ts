export default interface EntityGateway<T> {
    find(query: any): Promise<T[]>;
    save(item: T): Promise<T>;
}