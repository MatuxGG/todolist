import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollection: AngularFirestoreCollection<Todo>;

  private todo: Observable<Array<Todo>>;

  constructor(private db: AngularFirestore) {
    this.todoCollection = db.collection<Todo>('todo');
 
    this.todo = this.todoCollection.snapshotChanges().pipe(
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
    return this.todo;
  }

  add(todo: Todo) {
    return this.todoCollection.add(todo);
  }

  delete(todo: Todo){
    return this.todoCollection.doc(todo.id).delete();
  }
}
