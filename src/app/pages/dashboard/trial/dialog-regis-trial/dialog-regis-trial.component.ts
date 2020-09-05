import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlumnusService } from '@common/services/alumnus.service';

@Component({
  selector: 'app-dialog-regis-trial',
  templateUrl: './dialog-regis-trial.component.html',
  styleUrls: ['./dialog-regis-trial.component.scss']
})
export class DialogRegisTrialComponent implements OnInit {

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

  form: FormGroup;
  loading = false;
  detail: any;

  hours: [];
  minutes = [0, 15, 30, 45];
  hourSelected: any;
  minuteSelected: any;

  classes = [];
  languages = [];
  langSelected: string;
  levels = [];
  quantity = [1, 2, 3, 4, 6, 8, 10];

  constructor(
    public dialogRef: MatDialogRef<DialogRegisTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.form = this.createForm();
    this.hours = this.createArrayHour();
  }

  ngOnInit(): void {
    this.classes = JSON.parse(localStorage.getItem('listClass'));
    this.languages = JSON.parse(localStorage.getItem('listLang'));
    this.langSelected = this.languages[0]?.id;
    this.levels = JSON.parse(localStorage.getItem('listLevel')).filter(e => e.language.id === this.langSelected);
    if (this.data.data) {
      this.detail = this.data.data;
      this.form.addControl('id', new FormControl(this.detail.id));
      this.getInfoAlumnus(this.detail.id);
    }
  }

  /**
   * Easy get value
   */
  get f() { return this.form.controls; }

  /**
   * Handle default value
   */

  createForm(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      facebookLink: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      language: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      expectedClass: new FormControl('', Validators.required),
      expectedTime: new FormControl('', Validators.required),
      expectedWeekday: new FormControl('', Validators.required),
      note: new FormControl(''),
    });
  }

  updateForm(item): void {
    const { email, fullName, facebookLink, age, language, level, quantity, expectedTime, expectedWeekday, expectedClass, note } = item
    this.form.patchValue({
      email,
      fullName,
      facebookLink,
      age,
      language,
      level,
      quantity,
      expectedTime,
      expectedWeekday,
      expectedClass,
      note
    });
    this.updateInfo();
  }

  updateInfo(): void {
    // Select time
    const timeStamp = new Date(this.f.expectedTime.value);
    this.hourSelected = timeStamp.getHours();
    this.minuteSelected = timeStamp.getMinutes();

    // Select day
    this.expectedWeekday = this.f.expectedWeekday.value.split(',').map(e => +e);
    this.expectedWeekday.map(e => {
      this.weekDay[e - 2].checked = true
    });
  }

  createArrayHour(): any {
    let a = [];
    for (let i = 0; i < 24; i++) {
      a.push(i);
    }
    return a;
  }

  changeLanguage(e): void {
    this.langSelected = e.value;
    this.levels = JSON.parse(localStorage.getItem('listLevel')).filter(e => e.language.id === this.langSelected);
    this.f.level.setValue(this.levels[0]?.id);
  }

  changeTimeSelected(): void {
    let timeStamp = new Date();
    if (this.minuteSelected && !this.hourSelected) {
      this.hourSelected = 0;
    }
    if (!this.minuteSelected && this.hourSelected) {
      this.minuteSelected = 0;
    }
    timeStamp.setHours(this.hourSelected, this.minuteSelected, 0, 0);
    this.f.expectedTime.setValue(timeStamp.getTime());
  }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
    this.expectedWeekday = this.weekDay.filter(e => e.checked === true)
      .map(item => item.value);
    this.f.expectedWeekday.setValue(this.expectedWeekday.join(','));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Call API: alumnus service
   * @param id student ID
   */

  getInfoAlumnus(id: number): void {
    this.alumnusService.getAlumnusById(id).subscribe(
      rs => {
        this.updateForm(rs);
      },
      err => {
        console.log(err);
      })
  }

  submit(): void {
    this.loading = true;
    this.alumnusService[`${this.data.type}Alumnus`](this.form.value).subscribe(
      rs => {
        this.loading = false;
        this.dialogRef.close(rs);
      },
      err => {
        this.loading = false;
        console.log('This info alumnus: ', this.form.value);
        console.log('This error: ', err);
      }
    );
  }

}
