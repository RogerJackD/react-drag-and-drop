export type TaskStatus = 'TODO'|'IN_PROGRES'|'DONE';

export type Task = {
    id: string;
    status: TaskStatus;
    title: string;
    description: string;
};

export type Column = {
    id: TaskStatus
    title: string
}