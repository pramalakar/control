/**
 * Created by Prakash Malakar on 1/04/2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { CkEditorModule } from '../../modules/ckeditor.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    CkEditorModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ArticleComponent, CategoryComponent]
})
export class ArticleModule { }
