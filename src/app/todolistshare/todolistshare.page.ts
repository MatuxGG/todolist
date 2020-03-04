import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../services/todolists.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todolistshare',
  templateUrl: './todolistshare.page.html',
  styleUrls: ['./todolistshare.page.scss'],
})
export class TodolistsharePage implements OnInit {

  private listUid: string;

  constructor(private authService: AuthenticationService,
              private todoListsService: TodolistsService,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.listUid = params.id;
      console.log(this.listUid);
    });
  }

  shareWithUser(user_email: string): any {
    const users = this.getAllUsers();
    const i = users[0].indexOf(user_email);
    const user_uid = users[1][i];
    /*this.todoListsService.get_uid(this.listUid).subscribe(
      todoList => {
        if (todoList.accessReading !== undefined) {
          todoList.accessReading = [];
        }
        todoList.accessReading.push(user_uid);
      }
    );*/
  }

  getAllUsers(): any {
    this.authService.getAllUsers().subscribe(
      users => {
        const usersEmailUidList = users.split('\n');
        const emails = [];
        const uuid = [];
        console.log(users);
        for (let i in usersEmailUidList) {
          console.log(i);
          //if ((i % 2) === 0) {
          emails.push(usersEmailUidList[i]);
          //} else {
          //  uuid.push(usersEmailUidList[i]);
          //}
        }
        return [emails, uuid];
      }
    );
  }
}
