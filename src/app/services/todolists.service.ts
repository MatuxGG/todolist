import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todolist } from '../model/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {
  private todolistsCollection: AngularFirestoreCollection<Todolist>;
  private todolistsCollectionRead: AngularFirestoreCollection<Todolist>;
  private todolistsCollectionReadWrite: AngularFirestoreCollection<Todolist>;
  private todolists: Observable<Array<Todolist>>;
  private todolistsRead: Observable<Array<Todolist>>;
  private todolistsReadWrite: Observable<Array<Todolist>>;

  constructor(public authService: AuthenticationService, private db: AngularFirestore) { }

  initialize(userUid: string): void {
    this.todolistsCollection = this.db.collection<Todolist>('todolists', ref => ref.where('owner', '==', userUid));
    this.todolistsCollectionRead = this.db.collection<Todolist>(
      'todolists', ref => ref.where('accessReading', 'array-contains', userUid)
    );
    this.todolistsCollectionReadWrite = this.db.collection<Todolist>(
      'todolists', ref => ref.where('accessWriting', 'array-contains', userUid)
    );
    this.todolists = this.todolistsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.todolistsRead = this.todolistsCollectionRead.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.todolistsReadWrite = this.todolistsCollectionReadWrite.snapshotChanges().pipe(
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
    return this.todolists;
  }

  add(todolist: Todolist) {
    return this.todolistsCollection.add(todolist);
  }

  delete(todolist: Todolist){
    return this.todolistsCollection.doc(todolist.id).delete();
  }

}
