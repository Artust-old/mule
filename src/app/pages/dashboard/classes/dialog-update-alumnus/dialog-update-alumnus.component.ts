import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-update-alumnus',
  templateUrl: './dialog-update-alumnus.component.html',
  styleUrls: ['./dialog-update-alumnus.component.scss']
})
export class DialogUpdateAlumnusComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  alumnusInfo: any = {};
  loading = false;

  statusSelected: FormControl = new FormControl('', Validators.required);
  statusList = [
    { value: 'WAITING', text: 'Chờ học thử' },
    { value: 'TRIAL', text: 'Học thử' },
    { value: 'PAYMENT_PENDING', text: 'Chờ học phí' },
    { value: 'TRIAL', text: 'Học thử' },
    { value: 'OFFICIAL', text: 'Học chính thức' },
    { value: 'ABORTED', text: 'Không học' },
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateAlumnusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnusService: AlumnusService,
  ) {
    this.statusSelected.patchValue(data.status);
  }

  ngOnInit(): void {
    this.getAlumnusById();
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
        },
        err => {
          console.log(err);
        })
  }

  updateStatus(): void {
    this.loading = true;
    this.alumnusInfo.status = this.statusSelected.value;
    this.alumnusService.changeStatusAlumnus(this.alumnusInfo).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.loading = false;
          this.dialogRef.close(rs);
        },
        err => {
          console.log(err);
          this.loading = false;
          this.dialogRef.close();
        }
      );
  }

}
