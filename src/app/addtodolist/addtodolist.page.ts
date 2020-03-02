import { AuthenticationService } from './../services/authentication.service';
import { Todo } from './../model/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodolistsService } from '../services/todolists.service';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-addTodolist',
  templateUrl: './addTodolist.page.html',
  styleUrls: ['./addTodolist.page.scss'],
})
export class addTodolistPage implements OnInit {

  title: string;
  todos: Todo[];
  user : firebase.User;

  constructor(private authService: AuthenticationService,
              private todolistsService: TodolistsService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => {
        this.user = user;
        if (this.user !== undefined) {
          this.todolistsService.initialize(user.uid);
        }
        let todo: Todo = { title: "BLU", isDone: false};
        this.todos = [todo];
      }
    );
  }

  addList(){
    let todolist = { title: this.title, owner: this.user.uid, todos: this.todos } as Todolist;
    this.todolistsService.add(todolist);
    window.history.back();
  }
}
