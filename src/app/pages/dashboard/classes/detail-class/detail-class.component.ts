import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateAlumnusComponent } from '../dialog-update-alumnus/dialog-update-alumnus.component';

const FAKE_DATA = [
  {
    id: 1,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
  {
    id: 2,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ thanh toán',
    imgPayment: 'vietinbank',
    note: 'This is a note!',
  },
  {
    id: 3,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'vcb',
    note: undefined,
  },
  {
    id: 4,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: null,
  },
  {
    id: 5,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
  {
    id: 6,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
];

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.scss']
})
export class DetailClassComponent implements OnInit {

  paramRoute: string;

  displayedColumns: string[] = ['numberic', 'user', 'sale', 'status', 'attendance', 'note', 'actions'];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paramRoute = this.route.snapshot.paramMap.get('code');
  }

  handleBack(): void {
    this.router.navigate([`dashboard/classes`]);
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  openDialogUpdateAlumnus(): void {
    const dialogRef = this.dialog.open(DialogUpdateAlumnusComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
