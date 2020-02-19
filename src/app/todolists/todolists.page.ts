import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.page.html',
  styleUrls: ['./todolists.page.scss'],
})
export class TodolistsPage implements OnInit {

  private todolist$: Observable<Array<Todolist>>;

  constructor(private todolistsService: TodolistsService) {}

  ngOnInit() {
    this.todolist$ = this.todolistsService.get();
  }

  delete(todolist: Todolist){
    this.todolistsService.delete(todolist);
  }
}
