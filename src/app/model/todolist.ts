import { Todo } from './todo';

export interface Todolist {
    id?: string;
    title: string;
    todos: Todo[];
}
