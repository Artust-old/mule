import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

const FAKE_DATA = [
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: false,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: false,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
];

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.scss']
})
export class DetailClassComponent implements OnInit {

  displayedColumns: string[] = ['numberic', 'user', 'sale', 'attendance', 'adder', 'actions'];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handleBack(): void {
    this.router.navigate([`dashboard/list-trial`]);
  }

}
