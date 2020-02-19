import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  private todos$: Observable<Array<Todo>>;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.get();
  }  

  delete(todo: Todo){
    this.todoService.delete(todo);
  }
}
