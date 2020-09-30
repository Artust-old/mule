import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailClassComponent } from './detail-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { DialogUpdateAlumnusModule } from '../dialog-update-alumnus/dialog-update-alumnus.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogChangeClassTrialModule } from '../../list-trial/dialog-change-class-trial/dialog-change-class-trial.module';



@NgModule({
  declarations: [DetailClassComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRippleModule,
    MatProgressSpinnerModule,

    DialogUpdateAlumnusModule,
    DialogChangeClassTrialModule,
  ]
})
export class DetailClassModule { }
