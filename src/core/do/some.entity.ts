export default class Some {

    constructor(public readonly id: string) {}

    public toJSON(): any {
        return {
            id: this.id
        }
    }
}