import { UserData } from '../../model/userdata';
import { Todolist } from '../../model/todolist';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../../services/todolists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-todolistshare',
  templateUrl: './todolistshare.page.html',
  styleUrls: ['./todolistshare.page.scss'],
})
export class TodolistsharePage implements OnInit {

  public listUid: string;
  public allUsers: Observable<UserData[]>;
  public allUsersFiltered: Observable<UserData[]>;
  public readwrite: boolean;

  constructor(private authService: AuthenticationService,
              private todoListsService: TodolistsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.listUid;
      console.log(this.listUid);
    });
    this.allUsers = this.authService.getAllUsers();
    this.allUsersFiltered = this.allUsers;
    /*subscribe(
      res => { this.allUsers = res; this.allUsersFiltered = res; console.log(this.allUsers); }
    );*/
    this.authService.getUser().subscribe(
      user => {
        if (user !== undefined) {
          this.todoListsService.initialize(user.uid);
        }
      }
    );
  }

  getAllUsersFiltered(): Observable<UserData[]> {
    return this.allUsersFiltered;
  }

  getUsers(event: any): void {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.allUsersFiltered = this.allUsers.pipe(
        map(user => user.filter(userToFilter => userToFilter.email.toLowerCase().includes(query)))
    );
  }

  readWriteChange(event: any): any {
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
      (todoListDocumentSnapshot: any) => {
        const todoList: Todolist = todoListDocumentSnapshot.data();
        todoList.id = todoListDocumentSnapshot.id;
        if (todoList.accessReading === undefined) {
          todoList.accessReading = [];
        }
        if (!todoList.accessReading.includes(userUid) && todoList.owner !== userUid) {
          todoList.accessReading.push(userUid);
          this.todoListsService.update_uid(todoList);
        }
        this.router.navigate(['/todolist'], { queryParams: { listUid: todoList.id } });
      }
    );
  }

  shareWithUserReadWrite(userUid: string): any {
    this.todoListsService.get_uid(this.listUid).subscribe(
      (todoListDocumentSnapshot: any) => {
        const todoList: Todolist = todoListDocumentSnapshot.data();
        todoList.id = todoListDocumentSnapshot.id;
        if (todoList.accessWriting === undefined) {
          todoList.accessWriting = [];
        }
        if (!todoList.accessWriting.includes(userUid) && todoList.owner !== userUid) {
          if (todoList.accessReading.includes(userUid) === true) {
            const index = todoList.accessReading.indexOf(userUid);
            todoList.accessReading.splice(index, 1);
          }
          todoList.accessWriting.push(userUid);
          this.todoListsService.update_uid(todoList);
        }
        this.router.navigate(['/todolist'], { queryParams: { listUid: todoList.id } });
      }
    );
  }
}
