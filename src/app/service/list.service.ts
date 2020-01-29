import { TodoList } from './../model/todolist';
import { TodoItem } from './../model/todoitem';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listCollection: AngularFirestoreCollection<TodoList>;
  private list: Observable<Array<TodoList>>;

  constructor(private db: AngularFirestore) {
    this.listCollection = db.collection<TodoList>('todoslist');
    this.list = this.listCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  get(): Observable<TodoList[]> {
    return this.list;
  }

  get_list(id: string): Observable<TodoList> {
    this.list.get(id);
    return this.list;
  }

  post(todolist: TodoList): void {
    this.listCollection.add({
      name: todolist.name,
      items: todolist.items,
    });
  }

  delete(list: TodoList): void {
    this.listCollection.doc(list.id).delete();
  }

  put(list: TodoList): void {
    this.listCollection.doc(list.id).update(list);
  }

}
