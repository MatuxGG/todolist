import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { addTodolistPage } from './addtodolist.page';

const routes: Routes = [
  {
    path: '',
    component: addTodolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class addTodolistPageRoutingModule {}
