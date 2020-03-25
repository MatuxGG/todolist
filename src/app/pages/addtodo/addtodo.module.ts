import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddtodoPageRoutingModule } from './addtodo-routing.module';
import { AddtodoPage } from './addtodo.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtodoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    AddtodoPage,
  ]
})
export class AddtodoPageModule {}
