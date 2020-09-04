import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogUpdateSaleComponent } from './dialog-update-sale/dialog-update-sale.component';
import { MatDialog } from '@angular/material/dialog';

const FAKE_DATA = [
  {
    id: '1234',
    sale: {
      name: 'Nguyễn Vũ Ngọc Diệp',
    },
    email: 'harmenporter@gmail.com',
    phone: '+84123456789',
    status: 'Active',
    joinedDate: '20/02/2020',
  },
];

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  date = new FormControl(moment());

  displayedColumns: string[] = ['id', 'sale', 'email', 'phone', 'status', 'joinDate', 'manage'];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  openDialogUpdateInfoSale(item: any, feature: string): void {
    const data = {
      lecturer: item,
      feature,
      title: '',
    };
    switch (feature) {
      case 'update':
        data.title = 'THÔNG TIN SALE';
        break;
      case 'add':
        data.title = 'THÊM SALE MỚI';
        break;
      default:
        break;
    }
    const dialogUpdateInfoSaleRef = this.dialog.open(DialogUpdateSaleComponent, {
      // maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data,
    });

    dialogUpdateInfoSaleRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
