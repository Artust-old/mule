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

  classes: any;
  languages: any;
  levels: any;

  langSelected: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateInfoLecturerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lecturerService: LecturerService,
  ) {
    this.form = this.createForm();
    console.log(this.data);
  }

  ngOnInit(): void {
    this.classes = JSON.parse(localStorage.getItem('listClass'));
    this.languages = JSON.parse(localStorage.getItem('listLang'));
    this.langSelected = this.languages[0]?.id;
    this.form.controls.language.setValue(this.languages[0]?.id);
    this.levels = JSON.parse(localStorage.getItem('listLevel')).filter(e => e.language.id === this.form.controls.language.value)
    this.form.controls.level.setValue(this.levels[0]?.id);
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
    const { fullName, email, language, level, priceLevel, facebookLink } = this.data.lecturer;
    this.form.patchValue({
      fullName,
      email,
      language: this.languages.find(e => e.name === language).id,
      level: this.levels.find(e => e.name === level).id,
      priceLevel,
      facebookLink,
    });
    this.form.addControl('id', new FormControl(this.data.lecturer.id));
    this.getLecturerInfo();
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

  changeLanguage(e): void {
    this.langSelected = e.value;
    this.levels = JSON.parse(localStorage.getItem('listLevel')).filter(e => e.language.id === this.langSelected);
    this.f.level.setValue(this.levels[0]?.id);
  }

  submit(): void {
    this.loading = true;
    let dataUpdate = this.form.value;
    dataUpdate.price_level = dataUpdate.priceLevel;
    delete dataUpdate.priceLevel;
    this.lecturerService[`${this.data.feature}Lecturer`](dataUpdate).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.loading = false;
          this.dialogRef.close(rs);
        },
        err => {
          this.loading = false;
          console.log('This error: ', err);
        }
      );
  }

}
