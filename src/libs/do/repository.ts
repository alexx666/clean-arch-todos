// implemented by Adapters/Gateways
export default interface Repository<T> {
    find(data: any): Promise<T>;
}