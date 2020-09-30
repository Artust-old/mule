import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LecturerService } from '@common/services/lecturer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-update-info-lecturer',
  templateUrl: './dialog-update-info-lecturer.component.html',
  styleUrls: ['./dialog-update-info-lecturer.component.scss']
})
export class DialogUpdateInfoLecturerComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  form: FormGroup;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateInfoLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lecturerService: LecturerService,
  ) {
    this.form = this.createForm();
    console.log(this.data);
  }

  ngOnInit(): void {
    if (this.data.lecturer) {
      this.updateForm();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Easy get value
   */
  get f() { return this.form.controls; }

  createForm(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      language: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      priceLevel: new FormControl('', Validators.required),
      facebookLink: new FormControl('', Validators.required),
    });
  }

  updateForm(): void {
    const { id, fullName, email, language, level, priceLevel, facebookLink } = this.data.lecturer;
    this.form.patchValue({
      fullName,
      email,
      language,
      level,
      priceLevel,
      facebookLink,
    });
    this.form.addControl('id', new FormControl(this.data.lecturer.id));
    this.getLecturerInfo(id);
  }

  getLecturerInfo(id = this.data.lecturer.id): void {
    this.lecturerService.getLecturerById(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          console.log(rs);
          this.f.facebookLink.setValue(rs.facebookLink);
        },
        err => {
          console.log(err);
        }
      )
  }

  submit(): void {
    this.loading = true;
    this.lecturerService[`${this.data.feature}Lecturer`](this.form.value).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.loading = false;
          this.dialogRef.close(rs);
        },
        err => {
          this.loading = false;
          console.log('This info lecturer: ', this.form.value);
          console.log('This error: ', err);
        }
      );
  }

}
