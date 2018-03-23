import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  declarations: [UserListComponent, UserCreateComponent]
})
export class UsersModule { }
