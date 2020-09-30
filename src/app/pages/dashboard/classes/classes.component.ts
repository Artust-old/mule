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
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateClassComponent } from './dialog-update-class/dialog-update-class.component';
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
export class ClassesComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  date = new FormControl(moment());

  displayedColumns = ['code', 'lecturer', 'level', 'time', 'attendance', 'local', 'schedule', 'status', 'sale', 'menu'];
  dataSource = new MatTableDataSource<any>();
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
    {
      value: 'cancelled',
      show: 'Huỷ',
    },
    {
      value: 'official',
      show: 'Chính thức',
    },
    {
      value: 'completed',
      show: 'Đã xong',
    }
  ];
  languages = JSON.parse(localStorage.getItem('listLang'));

  filterForm: FormGroup;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private classService: ClassService,
  ) {
    this.filterForm = new FormGroup({
      language: new FormControl(''),
      status: new FormControl(''),
      keyword: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getListClass();
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
      return data['status'].toString().trim().toLowerCase().indexOf(searchTerm.status.toLowerCase().trim()) !== -1 &&
        data['language'].toString().trim().toLowerCase().indexOf(searchTerm.language.toLowerCase().trim()) !== -1;
    }
    return myFilterPredicate;
  }

  // Call API
  getListClass(): void {
    this.loading = true;
    this.classService.getListClass().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs.filter(item => item)
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
        }
      );
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

  openDialogUpdateClass(item): void {
    const dialogUpdateClassRef = this.dialog.open(DialogUpdateClassComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: item,
    });

    dialogUpdateClassRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListClass();
      }
    });
  }
}
