import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateInfoLecturerComponent } from './dialog-update-info-lecturer/dialog-update-info-lecturer.component';

const FAKE_DATA = [
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'Normal',
    email: 'teacher1@gmail.com',
    status: 'Active',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'Special',
    email: 'teacher1@gmail.com',
    status: 'Inactive',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'Harmen Porter',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
];

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.scss'],
})
export class LecturersComponent implements OnInit {

  // date = new FormControl(moment());

  displayedColumns = ['code', 'lecturer', 'language', 'level', 'price', 'email', 'status', 'joinDate', 'menu'];
  dataSource = new MatTableDataSource<any>(FAKE_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  // redirectDetail(e): void {
  //   this.router.navigate([`${e.code}`], { relativeTo: this.route });
  // }

  openDialogUpdateInfoLecturer(item: any, feature: string): void {
    const data = {
      lecturer: item,
      feature,
      title: '',
    };
    switch (feature) {
      case 'update':
        data.title = 'THÔNG TIN GIÁO VIÊN';
        break;
      case 'add':
        data.title = 'THÊM GIÁO VIÊN MỚI';
        break;
      default:
        break;
    }
    const dialogUpdateInfoLecturerRef = this.dialog.open(DialogUpdateInfoLecturerComponent, {
      maxWidth: '1000px',
      autoFocus: false,
      restoreFocus: false,
      data,
    });

    dialogUpdateInfoLecturerRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
