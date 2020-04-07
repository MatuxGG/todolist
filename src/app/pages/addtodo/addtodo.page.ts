import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../../model/todo';
import { TodosService } from '../../services/todos.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {
  public todo: Todo;

  constructor(private todosService: TodosService,
              private router: Router,
              private route: ActivatedRoute,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private geocoder: NativeGeocoder) {
    this.todo = {title: ''} as Todo;
  }

  ngOnInit() {
    const todoStored = localStorage.getItem('todo');
    if (todoStored !== null) {
      this.todo = JSON.parse(todoStored) as Todo;
      localStorage.removeItem('todo');
    } else {
      delete this.todo.location;
      delete this.todo.lng;
      delete this.todo.lat;
      this.route.queryParams.subscribe(params => {
        this.todo.list = params.listUid;
      });
    }
    this.route.queryParams.subscribe(params => {
      if (params.lat && params.lng) {
        this.todo.lat = params.lat;
        this.todo.lng = params.lng;
        if (this.todo.location !== undefined && this.todo.location !== null) {
          this.todo.location = params.pickupLocation;
        }
      }
    });
  }

  removeLoc(): void {
    delete this.todo.lng;
    delete this.todo.lat;
  }

  addTodo(listUid: string) {
    console.log(this.todo);
    this.todosService.add(this.todo);
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.todo.list } });
  }

  backButton(): void {
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.todo.list } });
  }

  onpickupClick() {
    localStorage.setItem('todo', JSON.stringify(this.todo));
    this.router.navigate(['location-select'], { queryParams: { listUid: this.todo.list, returnPage: 'addtodo',
                                                               lat: this.todo.lat, lng: this.todo.lng} });
  }
}
