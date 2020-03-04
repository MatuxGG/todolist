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
  private listUid: string;

  constructor(private todoService: TodosService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.id;
      console.log(this.listUid);
      this.todoService.initialize(this.listUid);
    });
    this.todos$ = this.todoService.get();
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }

  addNewTodo() {
    this.router.navigate(['/addtodo'], { queryParams: { listUid: this.listUid } });
  }
}
