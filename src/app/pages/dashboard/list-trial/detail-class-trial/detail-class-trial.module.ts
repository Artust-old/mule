import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailClassTrialComponent } from './detail-class-trial.component';
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
import { DialogUpdateUserTrialModule } from '../dialog-update-user-trial/dialog-update-user-trial.module';
import { DialogChangeClassTrialComponent } from '../dialog-change-class-trial/dialog-change-class-trial.component';
import { DialogChangeClassTrialModule } from '../dialog-change-class-trial/dialog-change-class-trial.module';



@NgModule({
  declarations: [DetailClassTrialComponent],
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

    DialogUpdateUserTrialModule,
    DialogChangeClassTrialModule,
  ],
  exports: [DetailClassTrialComponent],
})
export class DetailClassTrialModule { }
