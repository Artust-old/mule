import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-update-user-trial',
  templateUrl: './dialog-update-user-trial.component.html',
  styleUrls: ['./dialog-update-user-trial.component.scss']
})
export class DialogUpdateUserTrialComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();
  
  loading = false;
  alumnusInfo = {
    status: '',
    note: '',
  };
  
  statusSelected: FormControl = new FormControl('', Validators.required);
  statusList = [
    { value: 'WAITING', text: 'Chờ học thử' },
    { value: 'PAYMENT_PENDING', text: 'Chờ học phí' },
    { value: 'FINISHED', text: 'Đã học xong' },
    { value: 'TRIAL', text: 'Học thử' },
    { value: 'OFFICIAL', text: 'Học chính thức' },
    { value: 'ABORTED', text: 'Không học' },
  ];

  info: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateUserTrialComponent>,
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
    this.loading = true;
    this.alumnusService.getAlumnusById(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          console.log('Result: ', rs)
          this.alumnusInfo = rs;
          console.log('Alumnus info: ', this.alumnusInfo)
          this.loading = false;
          // this.statusSelected.patchValue(rs.status);
        },
        err => {
          console.log(err);
          this.loading = false;
        })
  }

  updateStatus(): void {
    this.loading = true;
    this.alumnusInfo.status = this.statusSelected.value;
    console.log(this.alumnusInfo);
    this.alumnusService.updateAlumnus(this.alumnusInfo).pipe(takeUntil(this.unsubscribe))
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
