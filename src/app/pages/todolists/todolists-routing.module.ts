import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistsPage } from './todolists.page';

const routes: Routes = [
  {
    path: '',
    component: TodolistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistsPageRoutingModule {}
