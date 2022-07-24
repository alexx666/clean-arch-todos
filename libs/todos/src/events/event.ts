export default interface Event<T> {
    type: string;
    details: T;
    id: string;
    timestamp: number;
}