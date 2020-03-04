import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistsharePageRoutingModule } from './todolistshare-routing.module';

import { TodolistsharePage } from './todolistshare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistsharePageRoutingModule
  ],
  declarations: [TodolistsharePage]
})
export class TodolistsharePageModule {}
