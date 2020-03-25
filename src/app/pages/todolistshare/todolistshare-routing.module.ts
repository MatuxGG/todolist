import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistsharePage } from './todolistshare.page';

const routes: Routes = [
  {
    path: '',
    component: TodolistsharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistsharePageRoutingModule {}
