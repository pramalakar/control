/**
 * Created by Prakash Malakar on 26/03/2018.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {WidgetComponent} from './widget/widget.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
  },
  {
    path: 'widget/:id',
    component: WidgetComponent,
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
export class LayoutRoutingModule { }
