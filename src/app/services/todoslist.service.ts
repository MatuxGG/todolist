import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todolist } from '../model/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodoslistService {

  private todolistCollection: AngularFirestoreCollection<Todolist>;

  private todolist: Observable<Array<Todolist>>;
  
  constructor(private db: AngularFirestore) {
    this.todolistCollection = db.collection<Todolist>('todolist');
 
    this.todolist = this.todolistCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  
  get(): Observable<Array<Todolist>> {
    return this.todolist;
  }

  add(todolist: Todolist) {
    return this.todolistCollection.add(todolist);
  }

  delete(todolist: Todolist){
    return this.todolistCollection.doc(todolist.id).delete();
  }

}
