import { TodoList } from './../model/todolist';
import { TodoItem } from './../model/todoitem';
import { ListService } from './../service/list.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list: Observable<TodoList[]>;
  listAdd: TodoList;
  item: TodoItem;

  constructor(private listService: ListService) {
    this.listAdd = {name: '', items: []};
    this.item = {name: '', desc: '', complete: false};
  }

  onAddList(): void {
    this.listService.post(this.listAdd);
  }

  onAddItem(list: TodoList): void {
    list.items.push(this.item);
    this.onChange(list);
  }

  onDelete(list: TodoList): void {
    this.listService.delete(list);
  }

  onChange(list: TodoList): void {
    this.listService.put(list);
  }
}
