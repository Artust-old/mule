import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,

    FlexLayoutModule,

    MatButtonModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule { }
