import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTodolistPage } from './addtodolist.page';

const routes: Routes = [
  {
    path: '',
    component: AddTodolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTodolistPageRoutingModule {}
