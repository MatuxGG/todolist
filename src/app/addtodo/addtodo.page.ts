import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {

  title: string;

  constructor(private todosService: TodosService,
    private router: Router) { }

  ngOnInit() {
  }

  addList(){
    let item = { title: this.title, isDone: false } as Todo;
    this.todosService.add(item);
    window.history.back();
  }
}
