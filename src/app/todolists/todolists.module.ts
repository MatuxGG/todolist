import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistsPageRoutingModule } from './todolists-routing.module';

import { TodolistsPage } from './todolists.page';

import { Todolist } from '../model/todolist';
import { TodolistsService } from '../services/todolists.service';
import { Observable } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistsPageRoutingModule
  ],
  declarations: [TodolistsPage]
})
export class TodolistsPageModule { }
