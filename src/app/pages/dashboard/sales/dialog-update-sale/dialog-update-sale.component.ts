import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-sale',
  templateUrl: './dialog-update-sale.component.html',
  styleUrls: ['./dialog-update-sale.component.scss']
})
export class DialogUpdateSaleComponent implements OnInit {

  data: {};

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any,
  ) { }

  ngOnInit(): void {
    if (this.dataReceive.sale) {
      this.data = this.dataReceive;
    } else {
      this.data = Object.assign(this.dataReceive, this.data);
    }
  }

}
