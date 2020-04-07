import { Todolist } from './../../model/todolist';
import { TodolistService } from './../../services/todolist.service';
import { AuthenticationService } from './../../services/authentication.service';
import { UtilsService } from './../../services/utils.service';
import { SpeechService } from '../../services/speech.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  public canWrite: Observable<any>;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private camera: Camera,
              private speechService: SpeechService,
              private utilsService: UtilsService,
              private authService: AuthenticationService,
              private todolistService: TodolistService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoUid = params.todoUid;
      console.log('TodoUID : ' + this.todoUid);
      this.todoService.initialize(this.todoUid);
      this.todo$ = this.todoService.getTodo();
      const todoStored = localStorage.getItem('todo');
      if (todoStored !== null) {
        this.todo = JSON.parse(todoStored) as Todo;
        localStorage.removeItem('todo');
        this.canWriteFunc(this.todo);
        this.updateGPS(params);
      } else {
        this.todo$.subscribe(todo => {
          this.todo = todo;
          this.canWriteFunc(this.todo);
          this.updateGPS(params);
        });
      }
    });
  }

  updateGPS(params): void {
    if (params.lng && params.lat) {
      this.todo.lng = params.lng;
      this.todo.lat = params.lat;
      if (this.todo.location !== undefined && this.todo.location !== null) {
        this.todo.location = params.pickupLocation;
      }
    }
  }

  removeLoc(): void {
    delete this.todo.lng;
    delete this.todo.lat;
  }

  updateTodo(): void {
    this.todoService.updateTodo(this.todo).then( res => {
        this.router.navigate(['/todolist'], { queryParams: { listUid: this.todo.list } });
      }
    );
  }

  backButton(): void {
    this.router.navigate(['/todolist'], { queryParams: { listUid: this.todo.list } });
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

  deletePicture(): void {
    delete this.todo.picture;
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
    localStorage.setItem('todo', JSON.stringify(this.todo));
    this.router.navigate(['location-select'], {queryParams: { todoUid: this.todoUid, returnPage: 'todo',
                                               lat: this.todo.lat, lng: this.todo.lng, pickupLocation: this.todo.location }});
  }

  canWriteFunc(todo: Todo): void {
    this.authService.getUser().subscribe((user: firebase.User) => {
      const listId = todo.list;
      this.todolistService.initialize(listId);
      this.todolistService.getTodolist().subscribe((todolist: Todolist) => {
        const cond = todolist.owner === user.uid || (todolist.accessWriting !== undefined && todolist.accessWriting.includes(user.uid));
        console.log(cond);
        this.canWrite = of(cond);
      });
    });
  }
}
