import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AlumnusService } from '@common/services/alumnus.service';

@Component({
  selector: 'app-dialog-regis-trial',
  templateUrl: './dialog-regis-trial.component.html',
  styleUrls: ['./dialog-regis-trial.component.scss']
})
export class DialogRegisTrialComponent implements OnInit {

  week = [
    { value: 'Thứ 2', checked: false },
    { value: 'Thứ 3', checked: false },
    { value: 'Thứ 4', checked: false },
    { value: 'Thứ 5', checked: false },
    { value: 'Thứ 6', checked: false },
    { value: 'Thứ 7', checked: false },
    { value: 'CN', checked: false },
  ];
  expectedWeekday = [];

  form: FormGroup;
  loading = false;
  detail: any;

  constructor(
    public dialogRef: MatDialogRef<DialogRegisTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.data) {
      this.detail = this.data.data;
      this.form.patchValue({
        id: this.detail.id,
        fullName: this.detail.fullName,
        level: this.detail.level,
        email: this.detail.email,
        expectedClass: this.detail.classCode,
      });
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      facebookLink: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      language: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      maxSlot: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      expectedClass: new FormControl('', Validators.required),
      expectedTime: new FormControl('', Validators.required),
      expectedWeekday: new FormControl('', Validators.required),
      note: new FormControl(''),
    });
  }

  get f() { return this.form.controls; }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
    if (e.checked) {
      this.expectedWeekday.push(e.value);
    } else {
      this.expectedWeekday.splice(this.expectedWeekday.indexOf(e.value), 1);
    }
    this.f.expectedWeekday.setValue(this.expectedWeekday);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.loading = true;
    this.alumnusService[`${this.data.type}Alumnus`](this.form.value).subscribe(rs => {
      this.loading = false;
      this.dialogRef.close(rs);
    });
  }

}
