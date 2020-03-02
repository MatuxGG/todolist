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

  constructor(private todolistsService: TodolistsService, private router: Router) {}

  ngOnInit() {
    this.todolist$ = this.todolistsService.get();
  }

  moveToTodolist(todolist: Todolist) {
    this.router.navigate(['/todolist'], { queryParams: { id: todolist.id } });

  }

  delete(todolist: Todolist){
    this.todolistsService.delete(todolist);
  }
}
