import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-change-class-trial',
  templateUrl: './dialog-change-class-trial.component.html',
  styleUrls: ['./dialog-change-class-trial.component.scss']
})
export class DialogChangeClassTrialComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogChangeClassTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
