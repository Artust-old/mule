import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-update-user-trial',
  templateUrl: './dialog-update-user-trial.component.html',
  styleUrls: ['./dialog-update-user-trial.component.scss']
})
export class DialogUpdateUserTrialComponent implements OnInit {

  statusSelected = new FormControl('Không học', Validators.required);
  loading = false;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateUserTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.info = {...data};
  }

  ngOnInit(): void {
  }

  updateStatus(): void {
    this.loading = true;
    this.info.status = this.statusSelected.value;
    this.alumnusService.updateAlumnus(this.info).subscribe(rs => {
      this.loading = false;
      this.dialogRef.close(rs);
    });
  }

}
