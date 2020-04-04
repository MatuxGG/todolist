import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../../model/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {

  public title: string;
  public listUid: string;

  constructor(private todosService: TodosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      console.log(this.listUid);
    });
  }

  addList(listUid: string) {
    const todo = { title: this.title, isDone: false, list: this.listUid } as Todo;
    this.todosService.add(todo);
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.listUid } });
  }
}
