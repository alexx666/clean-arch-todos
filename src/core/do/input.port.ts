// Dependency of Controllers, implemented by Interactors
export default interface InputPort {
    doSomething(params: any): void
}