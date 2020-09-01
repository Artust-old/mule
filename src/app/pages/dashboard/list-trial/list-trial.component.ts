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
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Chờ đủ người',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Học thử',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Chờ đủ người',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Học thử',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Chờ đủ người',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
  {
    code: 'DEA1032',
    lecturer: {
      name: 'Harmen Porter',
      linkFb: 'www.facebook.com/amoniac',
    },
    level: {
      language: 'Tiếng Đức',
      cetificate: 'A1',
    },
    time: {
      clock: '21h - 23h (DE)',
      day: 'Thứ 2,3,5',
    },
    type: 6,
    status: 'Chờ đủ người',
    startDate: new Date().toDateString(),
    supervisor: 'Nguyễn Vũ Ngọc Diệp',
  },
];

@Component({
  selector: 'app-list-trial',
  templateUrl: './list-trial.component.html',
  styleUrls: ['./list-trial.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ListTrialComponent implements OnInit {
  date = new FormControl(moment());

  displayedColumns: string[] = ['code', 'lecturer', 'level', 'time', 'type', 'status', 'startDate', 'supervisor', 'detail'];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
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
    console.log(e);
    this.router.navigate([`${e.code}`], { relativeTo: this.route });
  }

}
