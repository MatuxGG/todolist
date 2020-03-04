import { Todo } from './../model/todo';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Array<Todo>>;

  constructor(private db: AngularFirestore) {
  }

  initialize(listUid: string): void {
    this.todosCollection = this.db.collection<Todo>('todos', ref => ref.where('list', '==', listUid));
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get(): Observable<Array<Todo>> {
    return this.todos;
  }

  add(todo: Todo) {
    if (this.todosCollection === undefined) {
      this.initialize(todo.list);
    }
    return this.todosCollection.add(todo);
  }

  delete(todo: Todo) {
    if (this.todosCollection === undefined) {
      this.initialize(todo.list);
    }
    return this.todosCollection.doc(todo.id).delete();
  }
}
