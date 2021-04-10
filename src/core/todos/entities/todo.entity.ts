export default class Todo {

    constructor(public readonly id: string) {}

    public toJSON(): any {
        return {
            id: this.id
        }
    }
}