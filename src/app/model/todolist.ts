import { User } from './user';
import { Todo } from './todo';

export interface Todolist {
    id?: string;
    title: string;
    todos: Todo[];
    owner: User;
    accessReading: string[]; // Id des utilisateurs ayant l'accès en lecture à la todolist
    accessWriting: string[]; // Id des utilisateurs pouvant lire/écrire dans la todolist
}
