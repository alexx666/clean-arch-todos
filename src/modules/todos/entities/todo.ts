export class Todo {
    constructor(public readonly id: string, public readonly description: string, public readonly due: Date) {
        if (!id) throw new Error("ValidationError: Id not provided!")
        if (!description) throw new Error("ValidationError: Description not provided!")
        if (!due) throw new Error("ValidationError: Due date not provided!")
    }
}
