import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'todolist',
    loadChildren: () => import('./todolist/todolist.module').then( m => m.TodolistPageModule)
  },
  {
    path: 'addtodo',
    loadChildren: () => import('./addtodo/addtodo.module').then( m => m.AddtodoPageModule)
  },
  {
    path: 'todolists',
    loadChildren: () => import('./todolists/todolists.module').then( m => m.TodolistsPageModule)
  },
  {
    path: 'addtodolist',
    loadChildren: () => import('./addtodolist/addtodolist.module').then( m => m.addTodolistPageModule)
  },
  {
    path: 'todolistshare',
    loadChildren: () => import('./todolistshare/todolistshare.module').then( m => m.TodolistsharePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
