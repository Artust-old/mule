import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TrialComponent } from './trial/trial.component';
import { AlumnusComponent } from './alumnus/alumnus.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { ClassesComponent } from './classes/classes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrialModule } from './trial/trial.module';
import { ListTrialModule } from './list-trial/list-trial.module';
import { ListTrialComponent } from './list-trial/list-trial.component';
import { DetailClassModule } from './list-trial/detail-class/detail-class.module';
import { DetailClassComponent } from './list-trial/detail-class/detail-class.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'trial',
        pathMatch: 'full',
      },
      {
        path: 'trial',
        component: TrialComponent,
      },
      {
        path: 'list-trial',
        component: ListTrialComponent,
      },
      {
        path: 'list-trial/:id',
        component: DetailClassComponent,
      },
      {
        path: 'classes',
        component: ClassesComponent,
      },
      {
        path: 'alumnus',
        component: AlumnusComponent,
      },
      {
        path: 'lecturers',
        component: LecturersComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, ClassesComponent, AlumnusComponent, LecturersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FlexLayoutModule,
    MatButtonModule,

    TrialModule,
    ListTrialModule,
    DetailClassModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
