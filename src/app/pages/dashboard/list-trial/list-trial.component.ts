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
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classService: ClassService,
  ) { }

  ngOnInit(): void {
    this.getListClassTrial();
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

  // Call API
  getListClassTrial(): void{
    this.loading = true;
    this.classService.getListClass().subscribe( rs => {
      this.dataSource.data = rs.filter( item => item);
      this.loading = false;
    });
  }

}
