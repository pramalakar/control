import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-create',
    component: UserCreateComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
