export interface Todo {
  id?: string;
  title: string;
  isDone: boolean;
  list?: string; // ID de la todolist associée
}
