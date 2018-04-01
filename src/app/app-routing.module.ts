import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'layout',
    loadChildren: 'app/layout/layout.module#LayoutModule'
  },
  {
    path: 'article',
    loadChildren: 'app/article/article.module#ArticleModule'
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '',
    // pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
