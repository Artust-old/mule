import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LecturerService } from '@common/services/lecturer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleService } from '@common/services/sale.service';
import { Class } from '@common/models/class';
import { ClassService } from '@common/services/class.service';

@Component({
  selector: 'app-dialog-update-class',
  templateUrl: './dialog-update-class.component.html',
  styleUrls: ['./dialog-update-class.component.scss']
})
export class DialogUpdateClassComponent implements OnInit {

  week = [
    { value: 2, checked: false },
    { value: 3, checked: false },
    { value: 4, checked: false },
    { value: 5, checked: false },
    { value: 6, checked: false },
    { value: 7, checked: false },
    { value: 8, checked: false },
  ];

  sales = [];
  lecturers = [];
  weekday = [];
  loading = false;

  pricing: number;
  currency: string;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lecturerService: LecturerService,
    private saleService: SaleService,
    private classService: ClassService,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.getListLecturer();
    this.getListSale();
  }

  createForm(): FormGroup {
    return new FormGroup({
      pricing: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      teacher: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      weekday: new FormControl('', Validators.required),
      sale: new FormControl('', Validators.required),
    });
  }

  chooseTimeTable(e): void {
    e.checked = !e.checked;
    if (e.checked) {
      this.weekday.push(e.value);
    } else {
      this.weekday.splice(this.weekday.indexOf(e.value), 1);
    }
    this.form.controls.weekday.setValue(this.weekday);
  }

  getListLecturer(): void {
    this.loading = true;
    this.lecturerService.getListLecturer().subscribe(rs => {
      this.lecturers = rs;
      this.loading = false;
    });
  }

  getListSale(): void {
    this.loading = true;
    this.saleService.getListSale().subscribe(rs => {
      this.sales = rs;
      this.loading = true;
    });
  }

  submit(): void {
    this.loading = true;
    this.classService.updateClass(this.form.value).subscribe(rs => {
      this.loading = false;
      this.dialogRef.close(rs);
    });
  }

}
