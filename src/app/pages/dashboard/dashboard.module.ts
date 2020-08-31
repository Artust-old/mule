import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TrialComponent } from './trial/trial.component';
import { ListTrialComponent } from './list-trial/list-trial.component';
import { AlumnusComponent } from './alumnus/alumnus.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { ClassesComponent } from './classes/classes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { TrialModule } from './trial/trial.module';

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
  declarations: [DashboardComponent, ListTrialComponent, ClassesComponent, AlumnusComponent, LecturersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FlexLayoutModule,
    MatButtonModule,

    TrialModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
