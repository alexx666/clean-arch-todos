export class Todo {
    constructor(public readonly id: string, public readonly description: string, public readonly timestamp: Date) {
        if (!id) throw new Error("ValidationError: Id not provided!")
        if (!description) throw new Error("ValidationError: Description not provided!")
        if (!timestamp) throw new Error("ValidationError: Timestamp not provided!")
    }
}
