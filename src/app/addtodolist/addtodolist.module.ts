import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { addTodolistPageRoutingModule } from './addtodolist-routing.module';
import { addTodolistPage } from './addtodolist.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    addTodolistPageRoutingModule
  ],
  declarations: [addTodolistPage, TranslateModule]
})
export class addTodolistPageModule {}
