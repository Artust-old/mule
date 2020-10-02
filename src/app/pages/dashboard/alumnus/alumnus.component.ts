import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { LogService } from '@common/services/log.service';
import { DialogRegisTrialComponent } from '../trial/dialog-regis-trial/dialog-regis-trial.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticateService } from '@common/services/authenticate.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alumnus',
  templateUrl: './alumnus.component.html',
  styleUrls: ['./alumnus.component.scss']
})
export class AlumnusComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  displayedColumns: string[];
  currentUser: any;
  saleId: number;
  dataSource = new MatTableDataSource<any>();
  loading = false;

  statusAlumnus = [
    {
      value: 'trial',
      show: 'Học thử',
    },
    {
      value: 'waiting',
      show: 'Chờ học thử',
    },
    {
      value: 'payment_pending',
      show: 'Chờ học phí',
    },
    {
      value: 'aborted',
      show: 'Không học',
    },
    {
      value: 'official',
      show: 'Học chính thức',
    },
    {
      value: 'finished',
      show: 'Đã học xong',
    }
  ];
  languages = JSON.parse(localStorage.getItem('listLang'));
  filterForm: FormGroup;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
    private authenticateService: AuthenticateService,
  ) {
    this.currentUser = this.authenticateService.currentUserValue;
    console.log('This is current user: ', this.currentUser);
    console.log('List sale: ', localStorage.getItem('listSale'));
    this.saleId = +JSON.parse(localStorage.getItem('listSale')).find(e => e.email === this.currentUser.email)?.id;
    this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'sale', 'dateJoin', 'manage'];
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      language: new FormControl(''),
      keyword: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getListAlumnus();
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

  customFilterPredicate(): any {
    const myFilterPredicate = (data: {}, filter: string): boolean => {
      let searchTerm = JSON.parse(filter);
      let globalMatch = Object.entries(data).find(e => e.toString().trim().toLowerCase().indexOf(searchTerm.keyword.toLowerCase().trim()) !== -1);
      if (!globalMatch) {
        return;
      }
      return data['status'].toString().trim().toLowerCase().indexOf(searchTerm.status.toLowerCase().trim()) !== -1;
      // && data['language'].toString().trim().toLowerCase().indexOf(searchTerm.language.toLowerCase().trim()) !== -1;
    }
    return myFilterPredicate;
  }

  getListAlumnus(): void {
    this.loading = true;
    this.alumnusService.getListAlumnus().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.dataSource.data = [];
          this.loading = false;
        }
      );
  }

  getListAlumnusBySaleId(userId = this.currentUser.id) {
    this.loading = true;
    this.alumnusService.getAlumnusBySaleId(userId).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs;
          this.loading = false;
        },
        err => {
          this.dataSource.data = [];
          this.loading = false;
          console.log(err)
        }
      );
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  displayedColumn(e): void {
    // 'id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy', 'facebook', 'more'
    this.selectedTab = e.index;
    switch (e.index) {
      case 0:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'sale', 'dateJoin', 'manage'];
        this.getListAlumnus();
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'dateJoin', 'manage'];
        this.getListAlumnusBySaleId();
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }

  openDialogRegisTrial(alumnus): void {
    const data = { title: 'CHỈNH SỬA THÔNG TIN HỌC VIÊN', type:'update', data: alumnus };
    const dialogRef = this.dialog.open(DialogRegisTrialComponent, {
      width: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data,
    });

    dialogRef.afterClosed().subscribe(rs => {
      console.log(rs);
      if (rs) {
        switch (this.selectedTab) {
          case 0:
            this.getListAlumnus();
            break;
          case 1:
            this.getListAlumnusBySaleId(this.currentUser.id);
            break;
        }
      }
    });
  }
}
