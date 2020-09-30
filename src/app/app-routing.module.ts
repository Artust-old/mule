import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from '@common/helpers/auth-guard.interceptor';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'user',
    component: AuthComponent,
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/chat-box/chat-box.module').then(m => m.ChatBoxModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
