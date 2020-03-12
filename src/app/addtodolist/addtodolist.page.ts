import { AuthenticationService } from './../services/authentication.service';
import { Todo } from './../model/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodolistsService } from '../services/todolists.service';
import { Todolist } from '../model/todolist';

@Component({
  selector: 'app-addtodolist',
  templateUrl: './addtodolist.page.html',
  styleUrls: ['./addtodolist.page.scss'],
})
export class addTodolistPage implements OnInit {

  title: string;
  user : firebase.User;

  constructor(private authService: AuthenticationService,
              private todolistsService: TodolistsService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (user) => {
        this.user = user;
        if (this.user !== undefined) {
          this.todolistsService.initialize(user.uid);
        }
      }
    );
  }

  addList(){
    let todolist = { title: this.title, owner: this.user.uid } as Todolist;
    this.todolistsService.add(todolist);
    window.history.back();
  }
}
