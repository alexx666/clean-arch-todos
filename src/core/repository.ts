export default interface Repository<T> {
    find(query: any): Promise<T[]>;
}