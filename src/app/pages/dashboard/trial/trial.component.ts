import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisTrialComponent } from './dialog-regis-trial/dialog-regis-trial.component';
import { AlumnusService } from '@common/services/alumnus.service';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { AuthenticateService } from '@common/services/authenticate.service';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss']
})
export class TrialComponent implements OnInit, OnDestroy {

  displayedColumns: string[];
  dataRespone: any;
  dataSource = new MatTableDataSource<any>([]);
  loading = false;
  saleId: number;
  currentUser: any;
  protected unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  // @ViewChild('searchInput', { static: true })
  // searchInput: ElementRef;

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
    private authenticateService: AuthenticateService,
  ) {
    this.currentUser = this.authenticateService.currentUserValue;
    this.saleId = +JSON.parse(localStorage.getItem('listSale')).find(e => e.email === this.currentUser.email)?.id;
    this.displayedColumns = ['id', 'user', 'level', 'time', 'class', 'sale', 'note', 'copy'];
  }

  ngOnInit(): void {
    this.getListAlumnusTrial();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListAlumnusTrial(): void {
    this.loading = true;
    this.alumnusService.getListAlumnus()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataRespone = rs.filter(item => item.status === 'TRIAL');
          this.dataSource.data = this.dataRespone;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.dataRespone = [];
          this.dataSource.data = this.dataRespone;
          this.loading = false;
        },
        () => this.loading = false
      );
  }

  getMyListAlumnusTrial(saleId = this.saleId): void {
    this.loading = true;
    this.alumnusService.getAlumnusBySaleId(saleId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataRespone = rs.filter(item => item.status === 'TRIAL');
          this.dataSource.data = this.dataRespone;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.dataRespone = [];
          this.dataSource.data = this.dataRespone;
          this.loading = false;
        }
      );
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  displayedColumn(e): void {
    // 'id', 'user', 'level', 'time', 'class', 'sale', 'note', 'copy', 'facebook', 'more'
    this.selectedTab = e.index;
    switch (this.selectedTab) {
      case 0:
        this.displayedColumns = ['id', 'user', 'level', 'time', 'class', 'sale', 'note', 'copy'];
        this.getListAlumnusTrial();
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'time', 'class', 'note', 'facebook', 'more'];
        this.getMyListAlumnusTrial();
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }

  openDialogRegisTrial(alumnus, key): void {
    let data = {};
    switch (key) {
      case 'regis':
        data = { title: 'ĐĂNG KÍ HỌC VIÊN HỌC THỬ', type: 'add' };
        break;
      case 'update':
        data = { title: 'CHỈNH SỬA THÔNG TIN HỌC VIÊN', type: 'update', data: alumnus };
        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(DialogRegisTrialComponent, {
      width: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data,
    });

    dialogRef.afterClosed().subscribe(rs => {
      if (rs) {
        switch (this.selectedTab) {
          case 0:
            this.getListAlumnusTrial();
            break;
          case 1:
            this.getMyListAlumnusTrial(1);
            break;
        }
      }
    });
  }
}
