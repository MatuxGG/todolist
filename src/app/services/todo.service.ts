import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Todo } from '../model/todo';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoDocument: AngularFirestoreDocument<Todo>;
  private todo: Observable<Todo>;

  constructor(private db: AngularFirestore) {
  }

  initialize(todoUid: string): void {
    this.todoDocument = this.db.collection<Todo[]>('todos').doc(todoUid);
    this.todo = this.todoDocument.snapshotChanges().pipe(
      map(a => {
          const data = a.payload.data();
          const id = a.payload.id;
          return { id, ...data };
      })
    );
  }

  getTodo(): Observable<Todo> {
    return this.todo;
  }

  updateTodo(todo: Todo): Promise<void> {
    console.log('Updating todo : ' + todo);
    return this.todoDocument.set(todo);
  }
}
