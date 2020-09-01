import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-alumnus',
  templateUrl: './dialog-update-alumnus.component.html',
  styleUrls: ['./dialog-update-alumnus.component.scss']
})
export class DialogUpdateAlumnusComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateAlumnusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }

}
