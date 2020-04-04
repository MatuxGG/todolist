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
    this.pickupLocation = "No location"; 
    this.lat = null;
    this.lng = null;
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      if (params.lat && params.lng) {
        this.lat = params.lat;
        this.lng = params.lng;
        this.pickupLocation = this.getAddress(this.lat, this.lng);
      }
    });
  }

  addList(listUid: string) {
    const todo = { title: this.title, isDone: false, list: this.listUid, location: this.pickupLocation } as Todo;
    this.todosService.add(todo);
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.listUid } });
  }

  onpickupClick(){
    if (this.lat && this.lng) {
      this.router.navigate(['location-select'], { queryParams: { id: this.listUid, returnPage: 'addtodo', lat: this.lat, lng: this.lng} });
    } else {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.router.navigate(['location-select'], { queryParams: { id: this.listUid, returnPage: 'addtodo', lat: resp.coords.latitude, lng: resp.coords.longitude} });
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }
  }

  getAddress(lat: number, long: number): string {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    console.log("vals");
    console.log(lat + " / " + long);
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      return Object.values(results[0]).reverse();
    });
    return null;
  }
}
