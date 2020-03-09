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

  constructor(private authService: AuthenticationService,
              private todoListsService: TodolistsService,
              private route: ActivatedRoute) {}

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

  shareWithUser(userUid: string): any {
    this.todoListsService.get_uid(this.listUid).subscribe(
      todoListDocumentSnapshot => {
        const todoList: Todolist = todoListDocumentSnapshot.data();
        todoList.id = todoListDocumentSnapshot.id;
        if (todoList.accessReading === undefined) {
          todoList.accessReading = [];
        }
        todoList.accessReading.push(userUid);
        this.todoListsService.update_uid(todoList);
      }
    );
  }
}
