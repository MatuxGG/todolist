import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistPageRoutingModule } from './todolist-routing.module';

import { TodolistPage } from './todolist.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistPageRoutingModule,
    TranslateModule
  ],
  declarations: [TodolistPage]
})
export class TodolistPageModule {}
