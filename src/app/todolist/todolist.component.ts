import { ListService } from './../service/list.service';
import { TodoList } from './../model/todolist';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  private list: Observable<TodoList>;

  constructor(private listService: ListService) {

   }

  ngOnInit() {}

}
