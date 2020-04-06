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

  public title: string;
  public listUid: string;
  public pickupLocation: string;
  public lat: number;
  public lng: number;

  constructor(private todosService: TodosService,
              private router: Router,
              private route: ActivatedRoute,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private geocoder: NativeGeocoder) {
               }

  ngOnInit() {
    this.pickupLocation = '';
    this.lat = null;
    this.lng = null;
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      if (params.lat && params.lng) {
        this.lat = params.lat;
        this.lng = params.lng;
        this.pickupLocation = params.pickupLocation;
      }
    });
  }

  addList(listUid: string) {
    const todo = { title: this.title, isDone: false, list: this.listUid, location: this.pickupLocation,
                   lat: this.lat, lng: this.lng } as Todo;
    this.todosService.add(todo);
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.listUid } });
  }

  onpickupClick() {
    this.router.navigate(['location-select'], { queryParams: { listUid: this.listUid, returnPage: 'addtodo',
                                                               lat: this.lat, lng: this.lng} });
  }
}
