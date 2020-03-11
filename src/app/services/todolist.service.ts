import { Todolist } from './../model/todolist';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  private todolistDocument: AngularFirestoreDocument<Todolist>;
  private todolist: Observable<Todolist>;

  constructor(private db: AngularFirestore) {
  }

  initialize(todolistUid: string): void {
    this.todolistDocument = this.db.collection<Todolist>('todolists').doc(todolistUid);
    this.todolist = this.todolistDocument.snapshotChanges().pipe(
      map(a => {
          const data = a.payload.data();
          const id = a.payload.id;
          return { id, ...data };
      })
    );
  }

  getTodolist(): Observable<Todolist> {
    return this.todolist;
  }

  updateTodolist(todolist: Todolist): Promise<void> {
    console.log('Updating todolist : ' + todolist);
    return this.todolistDocument.set(todolist);
  }
  
  
}
