import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaleService } from '@common/services/sale.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-update-sale',
  templateUrl: './dialog-update-sale.component.html',
  styleUrls: ['./dialog-update-sale.component.scss']
})
export class DialogUpdateSaleComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();

  form: FormGroup;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private saleService: SaleService,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.sale) {
      this.updateForm();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createForm(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      facebookLink: new FormControl('', Validators.required),
    });
  }

  updateForm(): void {
    const { id, email, fullName, phone, facebookLink } = this.data.sale;
    this.form.patchValue({
      email,
      fullName,
      phone,
      facebookLink,
    });
    this.form.addControl('id', new FormControl(this.data.sale.id));
    this.getSaleInfo();
  }

  getSaleInfo(id = this.data.sale.id): void {
    this.saleService.getSaleById(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.form.controls.facebookLink.setValue(rs.facebookLink);
        },
        err => {
          console.log(err);
        }
      );
  }

  submit(): void {
    this.loading = true;
    this.saleService[`${this.data.feature}Sale`](this.form.value).pipe(takeUntil(this.unsubscribe))
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
