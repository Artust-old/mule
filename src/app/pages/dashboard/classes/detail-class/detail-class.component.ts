import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateAlumnusComponent } from '../dialog-update-alumnus/dialog-update-alumnus.component';
import { AlumnusService } from '@common/services/alumnus.service';
import { Subject } from 'rxjs';
import { ClassService } from '@common/services/class.service';
import { takeUntil } from 'rxjs/operators';
import { DialogChangeClassTrialComponent } from '../../list-trial/dialog-change-class-trial/dialog-change-class-trial.component';

const FAKE_DATA = [
  {
    id: 1,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
  {
    id: 2,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ thanh toán',
    imgPayment: 'vietinbank',
    note: 'This is a note!',
  },
  {
    id: 3,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'vcb',
    note: undefined,
  },
  {
    id: 4,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: null,
  },
  {
    id: 5,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
  {
    id: 6,
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chính thức',
    imgPayment: 'acb',
    note: 'This is a note!',
  },
];

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.scss']
})
export class DetailClassComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  classId: number;
  classInfo: any;

  displayedColumns: string[] = ['numberic', 'user', 'sale', 'status', 'attendance', 'note', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  teacher: any;
  sale: any;

  @ViewChild(MatPaginator, { static: true })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private alumnusService: AlumnusService,
    private classService: ClassService,
  ) {
    this.classId = +this.route.snapshot.paramMap.get('code');
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.getInfoClass();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleBack(): void {
    this.router.navigate([`dashboard/classes`]);
  }

  getListAlumnus(classId = this.classInfo.classId): void {
    this.loading = true;
    this.classService.getAlumnusInClass(classId).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        });
  }

  getInfoClass(): void {
    this.loading = true;
    this.classService.getClassById(this.classId).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.classInfo = rs;
          this.getListAlumnus();
          this.teacher = JSON.parse(localStorage.getItem('listLecturer')).find(e => e.id === rs.teacher);
          this.sale = JSON.parse(localStorage.getItem('listSale')).find(e => e.id === rs.sale);
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        });
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  openDialogUpdateAlumnus(alumnus): void {
    const dialogRef = this.dialog.open(DialogUpdateAlumnusComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: alumnus,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListAlumnus();
    });
  }

  openDialogChangeClass(alumnus): void {
    const dialogChangeClassTrialRef = this.dialog.open(DialogChangeClassTrialComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: alumnus,
    });

    dialogChangeClassTrialRef.afterClosed().subscribe(result => {
      this.getListAlumnus();
    });
  }
}
