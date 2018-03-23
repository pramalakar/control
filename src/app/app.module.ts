import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';

import { HttpClientModule } from '@angular/common/http';
import {DataService} from '../providers/data-service';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { Ng2Webstorage } from 'ngx-webstorage';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    AsyncLocalStorageModule,
    Ng2Webstorage
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
