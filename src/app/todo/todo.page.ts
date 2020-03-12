import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  providers: [[Camera]]
})
export class TodoPage implements OnInit {

  public todo$: Observable<Todo>;
  public todoUid: string;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private camera: Camera,
              private toastController: ToastController) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todoUid = params.todoUid;
      console.log('TodoUID : ' + this.todoUid);
      this.todoService.initialize(this.todoUid);
      this.todo$ = this.todoService.getTodo();
      this.todo$.subscribe(todo => {
        console.log(todo);
      });
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).then( res => {
        this.router.navigate(['/todolist'], { queryParams: { listUid: todo.list } });
      }
    );
  }

  addPicture(todo: Todo): Promise<void> {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      todo.picture = base64Image;
      console.log('Picture');
      console.log(base64Image);
      this.toastController.create({
        message: base64Image,
        duration: 2000
      }).then( (toasting: HTMLIonToastElement) => {
        toasting.present();
      });
      this.todoService.updateTodo(todo).then();
    }, (err) => {
      // Handle error
      this.toastController.create({
        message: err,
        duration: 2000
      }).then( (toasting: HTMLIonToastElement) => {
        toasting.present();
      });
    });
  }
}
