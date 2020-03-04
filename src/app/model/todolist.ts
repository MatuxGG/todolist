import { User } from './user';
import { Todo } from './todo';

export interface Todolist {
    id?: string;
    title: string;
    todos?: string[];
    owner: string;
    accessReading?: string[]; // Id des utilisateurs ayant l'accès en lecture à la todolist
    accessWriting?: string[]; // Id des utilisateurs pouvant lire/écrire dans la todolist
}
