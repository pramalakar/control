/**
 * Created by Prakash Malakar on 26/03/2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { WidgetComponent } from './widget/widget.component';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [LayoutComponent, WidgetComponent]
})
export class LayoutModule { }
