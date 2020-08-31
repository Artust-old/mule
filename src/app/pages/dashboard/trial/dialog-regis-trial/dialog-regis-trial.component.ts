import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-regis-trial',
  templateUrl: './dialog-regis-trial.component.html',
  styleUrls: ['./dialog-regis-trial.component.scss']
})
export class DialogRegisTrialComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogRegisTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
