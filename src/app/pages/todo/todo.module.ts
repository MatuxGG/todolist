import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoPageRoutingModule } from './todo-routing.module';
import { TodoPage } from './todo.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    TodoPage,
  ]
})
export class TodoPageModule {}
