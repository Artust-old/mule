import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUpdateInfoLecturerComponent } from './dialog-update-info-lecturer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [DialogUpdateInfoLecturerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  entryComponents: [DialogUpdateInfoLecturerComponent],
})
export class DialogUpdateInfoLecturerModule { }
