export default class Todo {

    // TODO: validation logic
    constructor(public readonly id: string) {}

    public toJSON(): any {
        return {
            id: this.id
        }
    }
}