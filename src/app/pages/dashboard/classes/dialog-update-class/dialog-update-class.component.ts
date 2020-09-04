import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-class',
  templateUrl: './dialog-update-class.component.html',
  styleUrls: ['./dialog-update-class.component.scss']
})
export class DialogUpdateClassComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DialogUpdateClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

  ngOnInit(): void {
  }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
  }

}
