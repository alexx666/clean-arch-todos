export default interface TodoItem {
    id: string;
    start: string;
    end: string;
    expired: boolean;
    description: string;
    isDeleted: boolean;
}