import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  private todo$: Observable<Todo>;
  private todoUid: string;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoUid = params.id;
      console.log(this.todoUid);
      this.todoService.initialize(this.todoUid);
    });
    this.todo$ = this.todoService.get();
    console.log("this.todo");
    console.log(this.todo$);
  }

}
