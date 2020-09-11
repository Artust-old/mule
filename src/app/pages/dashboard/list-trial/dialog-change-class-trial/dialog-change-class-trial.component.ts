import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-change-class-trial',
  templateUrl: './dialog-change-class-trial.component.html',
  styleUrls: ['./dialog-change-class-trial.component.scss']
})
export class DialogChangeClassTrialComponent implements OnInit {

  info: any;
  loading = false;
  classSelected: FormControl;

  constructor(
    public dialogRef: MatDialogRef<DialogChangeClassTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.info = { ...data };
    this.classSelected = new FormControl(data.classCode, Validators.required);
  }

  ngOnInit(): void {
  }

  changeClass(): void {
    this.loading = true;
    this.info.classSelected = this.classSelected.value;
    this.alumnusService.updateAlumnus(this.info).subscribe(rs => {
      this.loading = false;
      this.dialogRef.close(rs);
    });
  }
}
