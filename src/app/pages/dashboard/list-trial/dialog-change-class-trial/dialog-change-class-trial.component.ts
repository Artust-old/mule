import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-change-class-trial',
  templateUrl: './dialog-change-class-trial.component.html',
  styleUrls: ['./dialog-change-class-trial.component.scss']
})
export class DialogChangeClassTrialComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  loading = false;
  classSelected: FormControl;
  listClass = localStorage.getItem('listClass');

  alumnusInfo: any;

  info: any;

  constructor(
    public dialogRef: MatDialogRef<DialogChangeClassTrialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.classSelected = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAlumnusById(id = this.data.id): void {
    this.alumnusService.getAlumnusById(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.alumnusInfo = rs;
          this.classSelected.patchValue(rs.arrangedClass);
        },
        err => {
          console.log(err);
        })
  }

  changeClass(): void {
    this.loading = true;
    this.alumnusInfo.classCode = this.classSelected.value;
    this.alumnusService.changeClassAlumnus(this.alumnusInfo).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.loading = false;
          this.dialogRef.close(rs);
        },
        err => {
          console.log(err);
          this.loading = false;
          this.dialogRef.close();
        });
  }
}
