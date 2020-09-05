import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlumnusService } from '@common/services/alumnus.service';
import { LogService } from '@common/services/log.service';
import { DialogRegisTrialComponent } from '../trial/dialog-regis-trial/dialog-regis-trial.component';

@Component({
  selector: 'app-alumnus',
  templateUrl: './alumnus.component.html',
  styleUrls: ['./alumnus.component.scss']
})
export class AlumnusComponent implements OnInit {

  displayedColumns: string[];
  // dataSource: MatTableDataSource<any>;
  dataSource = new MatTableDataSource<any>();
  loading = false;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  selectedTab = 0;

  constructor(
    private dialog: MatDialog,
    private alumnusService: AlumnusService,
    private log: LogService,
  ) {
    this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'supervisor', 'dateJoin', 'manage'];
  }

  ngOnInit(): void {
    this.getListAlumnus();
  }

  getListAlumnus(): void {
    this.loading = true;
    this.alumnusService.getListAlumnus().subscribe(rs => {
      this.dataSource.data = rs;
      this.loading = false;
    });
  }

  getListAlumnusBySaleId(saleId: number) {
    this.loading = true;
    this.alumnusService.getAlumnusBySaleId(saleId).subscribe(rs => {
      this.dataSource.data = rs;
      this.loading = false;
    });
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  displayedColumn(e): void {
    // 'id', 'user', 'level', 'time', 'recommend', 'sale', 'note', 'copy', 'facebook', 'more'
    this.selectedTab = e.index;
    switch (e.index) {
      case 0:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'supervisor', 'dateJoin', 'manage'];
        this.getListAlumnus();
        break;
      case 1:
        this.displayedColumns = ['id', 'user', 'level', 'class', 'email', 'status', 'dateJoin', 'manage'];
        this.getListAlumnusBySaleId(1);
        break;
      default:
        this.displayedColumns = [];
        break;
    }
  }

  openDialogRegisTrial(alumnus): void {
    const data = {title: 'CHỈNH SỬA THÔNG TIN HỌC VIÊN', data: alumnus};
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
            this.getListAlumnusBySaleId(1);
            break;
        }
      }
    });
  }
}
