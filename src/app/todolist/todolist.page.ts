import { map } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication.service';
import { TodolistService } from './../services/todolist.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable, of } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  public todos$: Observable<Array<Todo>>;
  public todolist$: Observable<Todolist>;
  public listUid: string;
  public canWrite: Observable<any>;

  constructor(private authService: AuthenticationService,
              private todoService: TodosService,
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
      this.canWriteFunc(todolist);
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

  editTodolistName(todolist) {
    this.todolistService.updateTodolist(todolist).then( res => {
      this.router.navigate(['/todolist'], { queryParams: { listUid: this.listUid } });
    });
  }

  canWriteFunc(todolist: Todolist): void {
    this.authService.getUser().subscribe((user: firebase.User) => {
      const cond = todolist.owner === user.uid || (todolist.accessWriting !== undefined && todolist.accessWriting.includes(user.uid))
      console.log(cond);
      this.canWrite = of(cond);
    });
  }
}
