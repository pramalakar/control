/**
 * Created by Prakash Malakar on 1/04/2018.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleComponent} from './article/article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
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
export class ArticleRoutingModule { }
