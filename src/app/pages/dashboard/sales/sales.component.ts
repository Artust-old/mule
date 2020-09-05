import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogUpdateSaleComponent } from './dialog-update-sale/dialog-update-sale.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SaleService } from '@common/services/sale.service';
import { takeUntil } from 'rxjs/operators';

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
export class SalesComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();

  date = new FormControl(moment());

  displayedColumns: string[] = ['id', 'sale', 'email', 'phone', 'status', 'joinDate', 'manage'];
  dataSource = new MatTableDataSource<any>();

  loading = false;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private saleService: SaleService,
  ) { }

  ngOnInit(): void {
    this.getSaleList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  getSaleList(): void {
    this.loading = true;
    this.saleService.getListSale().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      )
  }

  openDialogUpdateInfoSale(item: any, feature: string): void {
    const data = {
      sale: item,
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
      if (result) {
        this.getSaleList();
      }
    });
  }

}
