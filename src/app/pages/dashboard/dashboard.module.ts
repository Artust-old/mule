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
import { DetailClassTrialModule } from './list-trial/detail-class-trial/detail-class-trial.module';
import { DetailClassTrialComponent } from './list-trial/detail-class-trial/detail-class-trial.component';
import { DetailClassComponent } from './classes/detail-class/detail-class.component';
import { ClassesModule } from './classes/classes.module';
import { DetailClassModule } from './classes/detail-class/detail-class.module';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AlumnusModule } from './alumnus/alumnus.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { SalesComponent } from './sales/sales.component';
import { SalesModule } from './sales/sales.module';
import { PricingComponent } from './pricing/pricing.component';
import { PricingModule } from './pricing/pricing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
      // Trial class
      {
        path: 'trial',
        component: TrialComponent,
      },
      {
        path: 'list-trial',
        component: ListTrialComponent,
      },
      {
        path: 'list-trial/:code',
        component: DetailClassTrialComponent,
      },
      // Class
      {
        path: 'classes',
        component: ClassesComponent,
      },
      {
        path: 'classes/:code',
        component: DetailClassComponent,
      },
      // Alumnus
      {
        path: 'alumnus',
        component: AlumnusComponent,
      },
      // Lecturer
      {
        path: 'lecturers',
        component: LecturersComponent,
      },
      // Sales
      {
        path: 'sales',
        component: SalesComponent,
      },
      // Pricing
      {
        path: 'pricing',
        component: PricingComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FlexLayoutModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatProgressSpinnerModule,

    TrialModule,
    ListTrialModule,
    DetailClassTrialModule,
    ClassesModule,
    DetailClassModule,
    AlumnusModule,
    LecturersModule,
    SalesModule,
    PricingModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
