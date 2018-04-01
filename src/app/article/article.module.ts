/**
 * Created by Prakash Malakar on 1/04/2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';


@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
