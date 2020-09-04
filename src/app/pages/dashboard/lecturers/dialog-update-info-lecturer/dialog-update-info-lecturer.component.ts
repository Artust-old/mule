import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-info-lecturer',
  templateUrl: './dialog-update-info-lecturer.component.html',
  styleUrls: ['./dialog-update-info-lecturer.component.scss']
})
export class DialogUpdateInfoLecturerComponent implements OnInit {

  data = {
    lecturer: {
      price_level: 'Normal',
    }
  };

  temp: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateInfoLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any,
  ) {
  }

  ngOnInit(): void {
    if (this.dataReceive.lecturer) {
      this.data = this.dataReceive;
    } else {
      this.data = Object.assign(this.dataReceive, this.data);
    }
  }

}
