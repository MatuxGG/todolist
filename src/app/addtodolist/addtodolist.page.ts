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

  constructor(private todolistsService: TodolistsService,
    private router: Router) {
      let todo: Todo = { title: "BLU", isDone: false};
      this.todos = [todo];
    }

  ngOnInit() {
  }

  addList(){
    let item = { title: this.title, todos: this.todos } as Todolist;
    this.todolistsService.add(item);
    window.history.back();
  }
}
