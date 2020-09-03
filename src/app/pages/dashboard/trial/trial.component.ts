import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisTrialComponent } from './dialog-regis-trial/dialog-regis-trial.component';

const ELEMENT_DATA = [
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
  {
    id: 12345,
    user: {
      name: 'Harmen Porter',
      mail: 'harmenporter@gmail.com',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    recommend: 'DA1234',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    note: 'Yêu cầu giáo viên là nữ',
    linkFb: 'fb.com/hooman.tofu',
  },
];

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss']
})
export class TrialComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
  ) {
    this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy'];

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
        this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy'];
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'note', 'facebook', 'more'];
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }

  openDialogRegisTrial(): void {
    const dialogRef = this.dialog.open(DialogRegisTrialComponent, {
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
