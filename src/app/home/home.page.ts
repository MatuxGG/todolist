import { TodoItem } from './../model/todoitem';
import { ListService } from './../service/list.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  item: TodoItem;

  constructor(private listService: ListService) {
    this.item = {uuid: '', name: '', desc: '', complete: false};
  }

  onAdd(): void {
    this.listService.post(this.item);
    this.item = {uuid: '', name: '', desc: '', complete: false};
  }

  onDelete(item: TodoItem): void {
    this.listService.delete(item);
  }

  onChange(item: TodoItem): void {
    console.log("PUT");
    this.listService.put(item);
  }

}
