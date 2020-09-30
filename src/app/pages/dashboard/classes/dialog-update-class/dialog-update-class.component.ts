import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from '@common/services/class.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-update-class',
  templateUrl: './dialog-update-class.component.html',
  styleUrls: ['./dialog-update-class.component.scss']
})
export class DialogUpdateClassComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  weekDay = [
    { value: 2, show: 'Thứ 2', checked: false },
    { value: 3, show: 'Thứ 3', checked: false },
    { value: 4, show: 'Thứ 4', checked: false },
    { value: 5, show: 'Thứ 5', checked: false },
    { value: 6, show: 'Thứ 6', checked: false },
    { value: 7, show: 'Thứ 7', checked: false },
    { value: 8, show: 'CN', checked: false },
  ];
  expectedWeekday = [];

  loading = false;

  pricing: number;
  currency: string;

  hours: [];
  minutes = [0, 15, 30, 45];
  hourSelected: any;
  minuteSelected: any;

  form: FormGroup;

  classInfo: any;
  classDetail: any;
  lecturers = JSON.parse(localStorage.getItem('listLecturer'));
  sales = JSON.parse(localStorage.getItem('listSale'));

  weekday = [];

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classService: ClassService,
  ) {
    this.form = this.createForm();
    this.hours = this.createArrayHour();
  }

  ngOnInit(): void {
    if (this.data.classInfo) {
      this.classInfo = this.data.classInfo;
      this.updateInfo();
      this.getClassInfo();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  get f() { return this.form.controls; }

  createForm(): FormGroup {
    return new FormGroup({
      pricing: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      teacher: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      weekday: new FormControl('', Validators.required),
      sale: new FormControl('', Validators.required),
    });
  }

  updateForm(item): void {
    const { pricing, teacher, time, weekday, sale } = item;
    this.form.patchValue({
      pricing,
      teacher,
      time,
      weekday,
      sale
    });
    this.form.addControl('id', new FormControl(this.classInfo.id));
  }

  createArrayHour(): any {
    let a = [];
    for (let i = 0; i < 24; i++) {
      a.push(i);
    }
    return a;
  }

  changeTimeSelected(): void {
    let timeTest = new Date();
    if (this.minuteSelected && !this.hourSelected) {
      this.hourSelected = 0;
    }
    if (!this.minuteSelected && this.hourSelected) {
      this.minuteSelected = 0;
    }
    timeTest.setHours(this.hourSelected, this.minuteSelected, 0, 0);
    this.f.time.setValue(timeTest.getTime());
  }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
    this.expectedWeekday = this.weekDay.filter(e => e.checked === true)
      .map(item => item.value);
    this.f.weekday.setValue(this.expectedWeekday.join(','));
  }

  updateInfo(): void {
    // Select time
    const timeStamp = new Date(+this.classInfo.time);
    this.hourSelected = timeStamp.getHours();
    this.minuteSelected = timeStamp.getMinutes();

    // Select day
    this.expectedWeekday = this.classInfo.weekday.split(',').map(e => +e);
    this.expectedWeekday.map(e => {
      this.weekDay[e - 2].checked = true
    });
    this.f.weekday.setValue(this.expectedWeekday.join(','));
  }

  getClassInfo(): void {
    this.classService.getClassById(this.classInfo.id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.classDetail = rs;
          this.updateForm(rs);
        },
        err => {
          console.log(err);
        }
      )
  }

  submit(): void {
    this.loading = true;
    this.classService[`${this.data.type}Class`](this.form.value).subscribe(rs => {
      this.loading = false;
      this.dialogRef.close(rs);
    });
  }

}
