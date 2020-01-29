import { TodoList } from './../model/todolist';
import { TodoItem } from './../model/todoitem';
import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  list: TodoList;

  constructor() { 
    const item: TodoItem = {uuid: '0', name: 'First Item', desc: 'Super cool', complete: false};
    this.list = {uuid : '0', name: 'First List', items: [item]};

    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyDOTqSNQT_r5Gpo9tGBoQl8rV8vZLOPT_o',
      authDomain: '### FIREBASE AUTH DOMAIN ###',
      projectId: 'todolist-8b030'
    });

    var db = firebase.firestore();
  }

  get(): TodoList {
    return this.list;
  }

  post(item: TodoItem): void {
    item.uuid = this.list.items.length.toString();
    this.list.items.push(item);
  }

  delete(item: TodoItem): void {
    const index: number = this.list.items.indexOf(item, 0);
    if (index >= 0) {
      this.list.items.splice(index, 1);
    }
  }

  put(item: TodoItem): void {
    for(let i = 0; i<this.list.items.length; i++) {
      let cur = this.list.items[i];
      if (item.uuid === cur.uuid) {
        console.log("Found");
        console.log(this.list.items[i]);
        console.log(item);
        this.list.items[i] = item;
      }
    }
    console.log(this.list.items);
  }

}
