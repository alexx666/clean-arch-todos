// implemented by Adapters/Gateways
export default interface Repository<T> {
    find(): Promise<T[]>;
}