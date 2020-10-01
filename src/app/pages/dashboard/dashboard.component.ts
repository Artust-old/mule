import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClassService } from '@common/services/class.service';
import { CurrencyService } from '@common/services/currency.service';
import { LanguageService } from '@common/services/language.service';
import { LecturerService } from '@common/services/lecturer.service';
import { LevelService } from '@common/services/level.service';
import { SaleService } from '@common/services/sale.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  menuItem = [
    { route: 'trial', name: 'Đăng kí học thử', checked: false },
    { route: 'list-trial', name: 'Danh sách lớp học thử', checked: false },
    { route: 'classes', name: 'Lớp học', checked: false },
    { route: 'alumnus', name: 'Học viên', checked: false },
    { route: 'lecturers', name: 'Giáo viên', checked: false },
    { route: 'sales', name: 'Sale', checked: false },
    { route: 'pricing', name: 'Giá và điều kiện giá', checked: false },
  ];
  selectedItem = this.menuItem[0];
  currentRoute: string;

  loading = true;

  constructor(
    private router: Router,
    private classService: ClassService,
    private lecturerService: LecturerService,
    private saleService: SaleService,
    private levelService: LevelService,
    private langService: LanguageService,
    private currencyService: CurrencyService,
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((rs: NavigationEnd) => {
        this.selectedItem.checked = false;
        this.currentRoute = rs.urlAfterRedirects.split('/')[2];
        this.selectedItem = this.menuItem.find(item => item.route === this.currentRoute);
        this.selectedItem.checked = true;
      })
  }

  ngOnInit(): void {
    this.getClassList();
    this.getLecturerList();
    this.getSaleList();
    this.getLangList();
    this.getLevelList();
    this.getCurrencyList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  handleClick(item): void {
    this.selectedItem.checked = false;
    this.selectedItem = item;
    this.selectedItem.checked = true;
  }

  getClassList(): void {
    this.classService.getListClass().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          // Get list class to local storage
          // const temp = rs.map(e => e.classCode).filter(
          //   (value, index, self) => self.indexOf(value) === index
          // );
          const temp = rs.map(item => Object.assign({}, { id: item.id, classCode: item.classCode }));
          localStorage.setItem('listClass', JSON.stringify(temp));
        },
        err => {
          console.log(err);
        }
      )
  }

  getLecturerList(): void {
    this.lecturerService.getListLecturer().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          const temp = rs.map(item => Object.assign({}, { id: item.id, fullName: item.fullName, language: item.language }));
          localStorage.setItem('listLecturer', JSON.stringify(temp))
        },
        err => {
          console.log(err);
        }
      )
  }

  getSaleList(): void {
    // this.loading = false;
    this.saleService.getListSale().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.loading = false;
          const temp = rs.map(item => Object.assign({}, { id: item.id, fullName: item.fullName, email: item.email }));
          localStorage.setItem('listSale', JSON.stringify(temp));
        },
        err => {
          console.log(err);
        }
      )
  }

  getLevelList(): void {
    this.levelService.getLevel().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          // const temp = rs.map(item => Object.assign({}, { id: item.id, name: item.name }));
          localStorage.setItem('listLevel', JSON.stringify(rs));
        },
        err => {
          console.log(err);
        }
      )
  }

  getLangList(): void {
    this.langService.getLanguage().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          localStorage.setItem('listLang', JSON.stringify(rs));
        },
        err => {
          console.log(err);
        }
      )
  }

  getCurrencyList(): void {
    this.currencyService.getListCurrency().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          localStorage.setItem('listCurrency', JSON.stringify(rs));
        },
        err => {
          console.log(err);
        }
      )
  }

}
