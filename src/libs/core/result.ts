export default class Result<T> {

    constructor(private actionPromise: Promise<T>) {}

    public promise(): Promise<T> {
        return this.actionPromise
    }
}