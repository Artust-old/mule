import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUpdateAlumnusComponent } from './dialog-update-alumnus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [DialogUpdateAlumnusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRippleModule,
  ],
  entryComponents: [DialogUpdateAlumnusComponent],
})
export class DialogUpdateAlumnusModule { }
