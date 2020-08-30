import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/chat-box/chat-box.module').then(m => m.ChatBoxModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
