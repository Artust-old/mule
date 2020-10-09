import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateUserTrialComponent } from '../dialog-update-user-trial/dialog-update-user-trial.component';
import { DialogChangeClassTrialComponent } from '../dialog-change-class-trial/dialog-change-class-trial.component';
import { AlumnusService } from '@common/services/alumnus.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClassService } from '@common/services/class.service';

const FAKE_DATA = [
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: false,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: false,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
  {
    user: {
      name: 'Harmen Porter',
    },
    sale: 'Nguyễn Vũ Ngọc Diệp',
    status: 'Chờ học thử',
    attendance: true,
    adder: 'diepnguyen@gmail.com',
  },
];

@Component({
  selector: 'app-detail-class-trial',
  templateUrl: './detail-class-trial.component.html',
  styleUrls: ['./detail-class-trial.component.scss']
})
export class DetailClassTrialComponent implements OnInit, OnDestroy {

  // Unsubscribe service
  protected unsubscribe: Subject<void> = new Subject<void>();

  displayedColumns: string[] = ['numberic', 'user', 'sale', 'status', 'attendance', 'adder', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  classId: number;
  classInfo: any;

  teacher: any;
  sale: any;

  // @ViewChild(MatPaginator, { static: true })
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
    private classService: ClassService,
  ) {
    this.classId = +this.route.snapshot.paramMap.get('code');
  }

  ngOnInit(): void {
    this.getInfoClass();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * get list alumnus of class
   * @param classCode class code
   */

  getListAlumnus(classId = this.classId): void {
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

  /**
   * get info class
   */
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

  handleBack(): void {
    this.router.navigate([`dashboard/list-trial`]);
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  /**
   * open dialog, pass data to dialog
   */
  openDialogUpdateUser(alumnus): void {
    const dialogUpdateUserTrialRef = this.dialog.open(DialogUpdateUserTrialComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: alumnus,
    });

    dialogUpdateUserTrialRef.afterClosed().subscribe(result => {
      if (result)
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
      if (result)
        this.getListAlumnus();
    });
  }

}
