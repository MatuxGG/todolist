import { Todolist } from './../model/todolist';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../services/todolists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolistshare',
  templateUrl: './todolistshare.page.html',
  styleUrls: ['./todolistshare.page.scss'],
})
export class TodolistsharePage implements OnInit {

  private listUid: string;
  private allUsers$: Observable<JSON>;
  private readwrite: boolean;

  constructor(private authService: AuthenticationService,
              private todoListsService: TodolistsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      console.log(this.listUid);
    });
    this.allUsers$ = this.authService.getAllUsers();
    this.authService.getUser().subscribe(
      user => {
        if (user !== undefined) {
          this.todoListsService.initialize(user.uid);
        }
      }
    );
  }

  getUsers(event): any {
  }

  readWriteChange(event): any {
    this.readwrite = event.checked;
  }

  shareWithUser(userUid: string) {
    console.log(this.readwrite);
    if (this.readwrite === true) {
      console.log('Sharing in read write mode');
      this.shareWithUserReadWrite(userUid);
    } else {
      console.log('Sharing in read mode');
      this.shareWithUserRead(userUid);
    }
  }

  shareWithUserRead(userUid: string): any {
    this.todoListsService.get_uid(this.listUid).subscribe(
      todoListDocumentSnapshot => {
        const todoList: Todolist = todoListDocumentSnapshot.data();
        todoList.id = todoListDocumentSnapshot.id;
        if (todoList.accessReading === undefined) {
          todoList.accessReading = [];
        }
        if (!todoList.accessReading.includes(userUid)) {
          todoList.accessReading.push(userUid);
          this.todoListsService.update_uid(todoList);
        }
        this.router.navigate(['/todolist'], { queryParams: { listUid: todoList.id } });
      }
    );
  }

  shareWithUserReadWrite(userUid: string): any {
    this.todoListsService.get_uid(this.listUid).subscribe(
      todoListDocumentSnapshot => {
        const todoList: Todolist = todoListDocumentSnapshot.data();
        todoList.id = todoListDocumentSnapshot.id;
        if (todoList.accessWriting === undefined) {
          todoList.accessWriting = [];
        }
        if (!todoList.accessWriting.includes(userUid)) {
          todoList.accessWriting.push(userUid);
          this.todoListsService.update_uid(todoList);
        }
        this.router.navigate(['/todolist'], { queryParams: { listUid: todoList.id } });
      }
    );
  }
}
