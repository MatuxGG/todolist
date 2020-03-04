import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<Todo>;
  private todo: Observable<any>;

  constructor(private db: AngularFirestore) {
  }

  initialize(todoUid: string): void {
    this.todosCollection = this.db.collection<Todo>('todos', ref => ref.where('uid', '==', todoUid));
    this.todo = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        });
      })
    );
  }

  get(): Observable<Todo> {
    return this.todo;
  }

}
