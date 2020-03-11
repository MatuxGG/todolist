import { TodolistService } from './../services/todolist.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  private todos$: Observable<Array<Todo>>;
  private todolist$: Observable<Todolist>;
  private listUid: string;

  constructor(private todoService: TodosService,
              private todolistService: TodolistService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      console.log(this.listUid);
      this.todoService.initialize(this.listUid);
      this.todolistService.initialize(this.listUid);
    });
    this.todos$ = this.todoService.get();
    this.todos$.subscribe( todos => {
      console.log(todos);
    });
    this.todolist$ = this.todolistService.getTodolist();
    this.todolist$.subscribe( todolist => {
      console.log(todolist);
    });
  }

  edit(todo: Todo) {
    this.router.navigate(['/todo'], { queryParams: { todoUid: todo.id } });
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }

  addNewTodo() {
    this.router.navigate(['/addtodo'], { queryParams: { listUid: this.listUid } });
  }

  backToAllList() {
    this.router.navigate(['/todolists']);
  }

  shareToDoList() {
    this.router.navigate(['/todolistshare'], { queryParams: { listUid: this.listUid } });
  }
}
