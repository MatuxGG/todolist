import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'todolists',
    loadChildren: () => import('./pages/todolists/todolists.module').then( m => m.TodolistsPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'addtodolist',
    loadChildren: () => import('./pages/addtodolist/addtodolist.module').then( m => m.AddTodolistPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'todolist',
    loadChildren: () => import('./pages/todolist/todolist.module').then( m => m.TodolistPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'todo',
    loadChildren: () => import('./pages/todo/todo.module').then( m => m.TodoPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'addtodo',
    loadChildren: () => import('./pages/addtodo/addtodo.module').then( m => m.AddtodoPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'todolistshare',
    loadChildren: () => import('./pages/todolistshare/todolistshare.module').then( m => m.TodolistsharePageModule),
    canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
