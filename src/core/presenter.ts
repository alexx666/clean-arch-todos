export default interface Presenter {
    present<T>(data: T): void;
}