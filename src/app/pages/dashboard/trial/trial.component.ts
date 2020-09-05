import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisTrialComponent } from './dialog-regis-trial/dialog-regis-trial.component';
import { AlumnusService } from '@common/services/alumnus.service';

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
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
  ) {
    this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy'];
  }

  ngOnInit(): void {
    this.getListAlumnusTrial();
  }

  getListAlumnusTrial(): void {
    this.loading = true;
    this.alumnusService.getListAlumnus().subscribe(rs => {
      this.dataSource.data = rs.filter(item => item);
      this.loading = false;
    });
  }

  getMyListAlumnusTrial(saleId: number): void {
    this.loading = true;
    this.alumnusService.getAlumnusBySaleId(saleId).subscribe(rs => {
      this.dataSource.data = rs.filter(item => item);
      this.loading = false;
    });
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  displayedColumn(e): void {
    // 'id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy', 'facebook', 'more'
    this.selectedTab = e.index;
    switch (this.selectedTab) {
      case 0:
        this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy'];
        this.getListAlumnusTrial();
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'time', 'recommend', 'note', 'facebook', 'more'];
        this.getMyListAlumnusTrial(1);
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }

  openDialogRegisTrial(alumnus, key): void {
    let data = {};
    switch (key) {
      case 'regis':
        data = { title: 'ĐĂNG KÍ HỌC VIÊN HỌC THỬ', type: 'add' };
        break;
      case 'update':
        data = { title: 'CHỈNH SỬA THÔNG TIN HỌC VIÊN', type: 'update', data: alumnus };
        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(DialogRegisTrialComponent, {
      width: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data,
    });

    dialogRef.afterClosed().subscribe(rs => {
      console.log(rs);
      if (rs) {
        switch (this.selectedTab) {
          case 0:
            this.getListAlumnusTrial();
            break;
          case 1:
            this.getMyListAlumnusTrial(1);
            break;
        }
      }
    });
  }
}
