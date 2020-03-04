import { Todo } from './../model/todo';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';
import { Todolist } from '../model/todolist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.page.html',
  styleUrls: ['./todolists.page.scss'],
})
export class TodolistsPage implements OnInit {

  private todolist$: Observable<Array<Todolist>>;
  private user: firebase.User;

  constructor(private authService: AuthenticationService, private todolistsService: TodolistsService, private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        if (this.user !== undefined) {
          this.todolistsService.initialize(this.user.uid);
        }
        this.todolist$ = this.todolistsService.get();
      }
    );
  }

  moveToTodolist(todolist: Todolist) {
    this.router.navigate(['/todolist'], { queryParams: { id: todolist.id } });
  }
  
  delete(todolist: Todolist) {
    this.todolistsService.delete(todolist);
  }
}
