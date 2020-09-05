import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateClassComponent } from './dialog-update-class/dialog-update-class.component';
import { ClassService } from '@common/services/class.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const FAKE_DATA = [
  {
    code: 'DEA1031',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Đức',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 4,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Ôn thi',
    status: 'Chờ đủ người',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Đức',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 4,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Chính thức',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1033',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Đức',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 4,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Chờ đủ người',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Đức',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 6,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Chờ đủ người',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Việt Nam',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 2,
    popular: 7,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Huỷ',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Đức',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 4,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Chờ đủ người',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/natbestboy',
    },
    level: {
      language: 'Tiếng Nhật',
      certificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    attendance: 4,
    popular: 6,
    local: 'Việt Nam',
    schedule: 'Tiêu chuẩn',
    status: 'Chờ đủ người',
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
];

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ClassesComponent implements OnInit {

  date = new FormControl(moment());

  displayedColumns = ['code', 'lecturer', 'level', 'time', 'attendance', 'local', 'schedule', 'status', 'supervisor', 'menu'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  @ViewChild(MatPaginator, { static: true })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private classService: ClassService,
  ) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.getListClass();
  }

  // Call API
  getListClass(): void{
    this.loading = true;
    this.classService.getListClass().subscribe( rs => {
      this.dataSource.data = rs.filter( item => item);
      this.loading = false;
    });
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  redirectDetail(e): void {
    this.router.navigate([`${e.classCode}`], { relativeTo: this.route });
  }

  openDialogUpdateClass(item): void {
    const dialogUpdateClassRef = this.dialog.open(DialogUpdateClassComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: item,
    });

    dialogUpdateClassRef.afterClosed().subscribe(result => {
      this.getListClass();
    });
  }
}
