import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

const FAKE_DATA = [
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Không học',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Học chính thức',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
  {
    id: '12345',
    user: {
      name: 'Harmen Porter',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1'
    },
    class: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
    dateJoin: '20/02/2020'
  },
];

@Component({
  selector: 'app-alumnus',
  templateUrl: './alumnus.component.html',
  styleUrls: ['./alumnus.component.scss']
})
export class AlumnusComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
  ) {
    this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'supervisor', 'dateJoin', 'manage'];

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  displayedColumn(e): void {
    // 'id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy', 'facebook', 'more'
    this.selectedTab = e.index;
    switch (e.index) {
      case 0:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'supervisor', 'dateJoin', 'manage'];
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'dateJoin', 'manage'];
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }
}
