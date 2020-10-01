import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { Moment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '@common/services/class.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class ListTrialComponent implements OnInit, OnDestroy {

  // Unsubscribe service
  protected unsubscribe: Subject<void> = new Subject<void>();

  date = new FormControl(moment());

  displayedColumns: string[] = ['code', 'lecturer', 'level', 'time', 'type', 'status', 'startDate', 'sale', 'detail'];
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  statusClass = [
    {
      value: 'trial',
      show: 'Học thử',
    },
    {
      value: 'created',
      show: 'Chờ đủ người',
    },
    // {
    //   value: 'cancelled',
    //   show: 'Huỷ',
    // },
    // {
    //   value: 'official',
    //   show: 'Chính thức',
    // },
    // {
    //   value: 'completed',
    //   show: 'Đã xong',
    // }
  ];
  languages = JSON.parse(localStorage.getItem('listLang'));

  filterForm: FormGroup;

  // filter: {

  // }

  // statusClass = {
  //   CREATED: 'Chờ đủ người',
  //   TRIAL: 'Học thử',
  //   OFFICIAL: 'Chính thức',
  //   COMPLETED: 'Đã xong',
  //   CANCELLED: 'Huỷ',
  // }

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classService: ClassService,
  ) {
    this.filterForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
      trialDate: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getListClassTrial();
    this.filterForm.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => {
        this.dataSource.filter = JSON.stringify(this.filterForm.value);
      })
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  customFilterPredicate(): any {
    const myFilterPredicate = (data: {}, filter: string): boolean => {
      let searchTerm = JSON.parse(filter);
      let globalMatch = Object.entries(data).find(e => e.toString().trim().toLowerCase().indexOf(searchTerm.keyword.toLowerCase().trim()) !== -1);
      if (!globalMatch) {
        return;
      }
      return data['status'].toString().trim().toLowerCase().indexOf(searchTerm.status.toLowerCase().trim()) !== -1;
      //   data['trialDate'].toString().trim().toLowerCase().indexOf(searchTerm.trialDate.toLowerCase().trim());
    }
    return myFilterPredicate;
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
    this.router.navigate([`${e.id}`], { relativeTo: this.route });
  }

  // Call API
  getListClassTrial(): void {
    this.loading = true;
    this.classService.getListClass().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          // Get list class to local storage
          const temp = rs.map(e => e.classCode).filter(
            (value, index, self) => self.indexOf(value) === index
          );
          localStorage.setItem('listClass', JSON.stringify(temp));
          // Filter trial class
          this.dataSource.data = rs.filter(item => item.status === 'TRIAL' || item.status === 'CREATED')
            .map(e => {
              if (e.time === 'Everyday') {
                e.time = new Date().setMinutes(0, 0, 0).toString();
                e.weekday = '2,3,4,5,6,7,8'
              }
              if (e.time === 'MONDAY/TUESDAY') {
                e.time = new Date().setMinutes(0, 0, 0).toString();
                e.weekday = '2,3'
              }
              return e;
            });
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        });
  }

}
