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
  public todo: Todo;
  public todoUid: string;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private camera: Camera,
              private speechService: SpeechService,
              private utilsService: UtilsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoUid = params.todoUid;
      console.log('TodoUID : ' + this.todoUid);
      this.todoService.initialize(this.todoUid);
      this.todo$ = this.todoService.getTodo();
      this.todo$.subscribe(todo => {
        this.todo = todo;
      });
      if (params.lng && params.lat) {
        this.todo.lng = params.lng;
        this.todo.lat = params.lat;
        this.todo.location = params.pickupLocation;
      }
    });
  }

  updateTodo(): void {
    this.todoService.updateTodo(this.todo).then( res => {
        this.router.navigate(['/todolist'], { queryParams: { listUid: this.todo.list } });
      }
    );
  }

  addPicture(): Promise<void> {
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
      this.todo.picture = base64Image;
      this.utilsService.showToaster('Image updated', 2000);
    }, (err) => {
      // Handle error
      this.utilsService.showToaster(err, 5000);
    });
  }

  speech(): void {
    this.speechService.checkAndRequestPermissions().then(() => {
      if (this.speechService.getHasPermission) {
        this.utilsService.showToaster('Permission for speech recognition ok', 2000);
        this.speechService.listenAndGetResult().then((message: string) => {
          this.utilsService.showToaster(message, 5000);
          if (message !== '') {
            this.todo.title = message;
          }
        });
      } else {
        this.utilsService.showToaster('Permission for speech recognition not set', 2000);
      }
    });
  }

  onpickupClick() {
    this.router.navigate(['location-select'], { queryParams: { todoUid: this.todoUid, returnPage: 'todo',
                                                               lat: this.todo.lat, lng: this.todo.lng } });
  }
}
