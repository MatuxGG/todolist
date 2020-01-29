import { TodoItem } from './TodoItem';
export interface TodoList {
    id?: string;
    name: string;
    items: TodoItem[];
}
