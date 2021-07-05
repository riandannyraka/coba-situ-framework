import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard, LoginGuard, PegawaiGuard } from './_classes/auth.guard';
import { AdminComponent } from './layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard-v2',
        pathMatch: 'full'
      },
      {
        path: 'create-fdp',
        canActivate: [PegawaiGuard],
        loadChildren: './theme/create-fdp/create-fdp.module#CreateFdpModule',
        data: { animation: '1' }
      },
      {
        path: 'dashboard-v2',
        canActivate: [PegawaiGuard],
        loadChildren: './theme/dashboard-v2/dashboard.module#DashboardModule',
        data: { animation: '1' }
      },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        canActivate: [LoginGuard],
        loadChildren: './theme/auth/authentication.module#AuthenticationModule'
      },
      {
        path: 'error',
        loadChildren: './theme/error/error.module#ErrorModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
