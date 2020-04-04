import { UtilsService } from './../../services/utils.service';
import { SpeechService } from '../../services/speech.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../model/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import {NativeGeocoder, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  providers: [[Camera]]
})
export class TodoPage implements OnInit {

  public todo$: Observable<Todo>;
  public todoUid: string;
  public pickupLocation: string;
  public lng: number;
  public lat: number;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private camera: Camera,
              private toastController: ToastController,
              private speechService: SpeechService,
              private utilsService: UtilsService,
              private geocoder: NativeGeocoder) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoUid = params.todoUid;
      console.log('TodoUID : ' + this.todoUid);
      this.todoService.initialize(this.todoUid);
      this.todo$ = this.todoService.getTodo();
      if (params.lng && params.lat) {
        this.lng = params.lng;
        this.lat = params.lat;
        this.pickupLocation = this.getAddress(this.lat, this.lng);
      } else {
        this.todo$.subscribe(todo => {
          this.lng = todo.lng;
          this.lat = todo.lat;
          this.pickupLocation = this.getAddress(this.lat, this.lng);
        })
      }
      this.todo$.subscribe(todo => {
        console.log(todo);
      });
    });
  }

  updateTodo(todo: Todo): void {
    todo.lat = this.lat;
    todo.lng = this.lng;
    this.todoService.updateTodo(todo).then( res => {
        this.router.navigate(['/todolist'], { queryParams: { listUid: todo.list } });
      }
    );
  }

  addPicture(todo: Todo): Promise<void> {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      todo.picture = base64Image;
      this.utilsService.showToaster('Image updated', 5000);
    }, (err) => {
      // Handle error
      this.utilsService.showToaster(err, 5000);
    });
  }

  speech(todo: Todo): void {
    this.speechService.checkAndRequestPermissions().then(() => {
      if (this.speechService.getHasPermission) {
        this.utilsService.showToaster('Permission for speech recognition ok', 2000);
        this.speechService.listenAndGetResult().then((message: string) => {
          this.utilsService.showToaster(message, 5000);
          if (message !== '') {
            todo.title = message;
          }
        });
      } else {
        this.utilsService.showToaster('Permission for speech recognition not set', 2000);
      }
    });
  }

  onpickupClick(){
    this.router.navigate(['location-select'], { queryParams: { id: this.todoUid, returnPage: 'todo', lat: this.lat, lng: this.lng } });
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
