import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateUserTrialComponent } from '../dialog-update-user-trial/dialog-update-user-trial.component';
import { DialogChangeClassTrialComponent } from '../dialog-change-class-trial/dialog-change-class-trial.component';
import { AlumnusService } from '@common/services/alumnus.service';

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
export class DetailClassTrialComponent implements OnInit {

  displayedColumns: string[] = ['numberic', 'user', 'sale', 'status', 'attendance', 'adder', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  paramRoute: string;

  // @ViewChild(MatPaginator, { static: true })
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
  ) {
    this.paramRoute = this.route.snapshot.paramMap.get('code');
  }

  ngOnInit(): void {
    this.callAPI();
  }

  callAPI(): void {
    this.loading = true;
    this.alumnusService.getListAlumnus().subscribe( rs => {
      this.dataSource.data = rs;
      this.loading = false;
    });
  }

  handleBack(): void {
    this.router.navigate([`dashboard/list-trial`]);
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  openDialogUpdateUser(alumnus): void {
    const dialogUpdateUserTrialRef = this.dialog.open(DialogUpdateUserTrialComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data: alumnus,
    });

    dialogUpdateUserTrialRef.afterClosed().subscribe(result => {
      this.callAPI();
      // alumnus = result;
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
      this.callAPI();
    });
  }

}
