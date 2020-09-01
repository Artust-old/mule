import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-user-trial',
  templateUrl: './dialog-update-user-trial.component.html',
  styleUrls: ['./dialog-update-user-trial.component.scss']
})
export class DialogUpdateUserTrialComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateUserTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
