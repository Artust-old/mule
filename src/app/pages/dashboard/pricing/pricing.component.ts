import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PricingService } from '@common/services/pricing.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();

  email: string;
  loading = false;

  languages: any;
  markets: any;
  quantities: any;

  filterForm: FormGroup;

  displayedColumns: string[] = ['language', 'level', 'market', 'quantity', 'road', 'price', 'currency', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private pricingService: PricingService
  ) {
    this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    this.languages = JSON.parse(localStorage.getItem('listLang')).map(e => e.name);
    this.filterForm = this.createForm();
  }

  ngOnInit(): void {
    this.getListPricing();

    this.filterForm.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(_ => {
        this.dataSource.filter = JSON.stringify(this.filterForm.value);
      })
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createForm(): FormGroup {
    return new FormGroup({
      road: new FormControl(''),
      market: new FormControl(''),
      quantity: new FormControl(''),
      language: new FormControl('')
    });
  }

  customFilterPredicate(): any {
    const myFilterPredicate = (data: {}, filter: string): boolean => {
      let match = true;
      let searchTerm = JSON.parse(filter);
      for (const search in searchTerm) {
        if (searchTerm[search] && data[search].toString().trim().toLowerCase() !== searchTerm[search]) {
          match = false;
          break;
        }
      }

      return match;
    }
    return myFilterPredicate;
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  getListPricing(): void {
    this.loading = true;
    this.pricingService.getListPricing().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs;
          console.log('Result API: ', rs);
          this.markets = rs.map(e => e?.market).filter((value, index, self) => {
            return self.indexOf(value) === index && value;
          });
          this.quantities = rs.map(e => e?.quantity).filter((value, index, self) => {
            return self.indexOf(value) === index && value;
          });
          this.loading = false;
        }
      )
  }
}
