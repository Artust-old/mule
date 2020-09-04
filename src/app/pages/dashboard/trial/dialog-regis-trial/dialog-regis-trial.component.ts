import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-regis-trial',
  templateUrl: './dialog-regis-trial.component.html',
  styleUrls: ['./dialog-regis-trial.component.scss']
})
export class DialogRegisTrialComponent implements OnInit {

  week = [
    { value: 'Thứ 2', checked: false},
    { value: 'Thứ 3', checked: false},
    { value: 'Thứ 4', checked: false},
    { value: 'Thứ 5', checked: false},
    { value: 'Thứ 6', checked: false},
    { value: 'Thứ 7', checked: false},
    { value: 'CN', checked: false},
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogRegisTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
  }

}
