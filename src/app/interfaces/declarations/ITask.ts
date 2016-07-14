export interface ITask {
    id?: string;
    name?: string;
    description?: string;
    logic?: Promise<any>;
}
