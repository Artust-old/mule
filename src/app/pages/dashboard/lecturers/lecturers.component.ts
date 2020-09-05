import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateInfoLecturerComponent } from './dialog-update-info-lecturer/dialog-update-info-lecturer.component';
import { LecturerService } from '@common/services/lecturer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

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
export class LecturersComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();

  // date = new FormControl(moment());

  displayedColumns = ['code', 'lecturer', 'language', 'level', 'price', 'email', 'status', 'joinDate', 'menu'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  statusLecturer = [
    'ACTIVE',
    'DEACTIVE',
  ]
  languages = JSON.parse(localStorage.getItem('listLang'));
  filterForm: FormGroup;

  @ViewChild(MatPaginator, { static: true })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private lecturerService: LecturerService,
  ) {
    this.filterForm = new FormGroup({
      language: new FormControl(''),
      status: new FormControl(''),
      keyword: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getListLecturer();
    console.log(!!this.filterForm.controls['keyword'].value)
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
      console.log(!!searchTerm.status, data['status'].toString().trim().toLowerCase(), searchTerm.status.toLowerCase().trim())
      if (searchTerm.status) {
        return data['status'].toString().trim().toLowerCase() === searchTerm.status.toLowerCase().trim()
          && data['language'].toString().trim().toLowerCase().indexOf(searchTerm.language.toLowerCase().trim()) !== -1;
      } else {
        console.log(data['language'].toString().trim().toLowerCase().indexOf(searchTerm.language.toLowerCase().trim()) !== -1)
        return data['language'].toString().trim().toLowerCase().indexOf(searchTerm.language.toLowerCase().trim()) !== -1;
      }
    }
    return myFilterPredicate;
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  getListLecturer(): void {
    this.loading = true;
    this.lecturerService.getListLecturer().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        rs => {
          this.dataSource.data = rs.map(e => {
            e.priceLevel = e.price_level;
            delete e.price_level;
            return e;
          });
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
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
      if (result) {
        this.getListLecturer();
      }
    });
  }
}
