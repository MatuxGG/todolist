import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  private todos$: Observable<Array<Todo>>;

  constructor(private todoService: TodosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this.todoService.initialize(id);
    });
    this.todos$ = this.todoService.get();
  }  

  delete(todo: Todo){
    this.todoService.delete(todo);
  }
}
