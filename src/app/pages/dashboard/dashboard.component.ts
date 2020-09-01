import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  menuItem = [
    { route: 'trial', name: 'Đăng kí học thử', checked: false },
    { route: 'list-trial', name: 'Danh sách lớp học thử', checked: false },
    { route: 'classes', name: 'Lớp học', checked: false },
    { route: 'alumnus', name: 'Học viên', checked: false },
    { route: 'lecturers', name: 'Giáo viên', checked: false },
  ];
  selectedItem: any;

  constructor() {
    this.menuItem[0].checked = true;
    this.selectedItem = this.menuItem[0];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  handleClick(item): void {
    this.selectedItem.checked = false;
    this.selectedItem = item;
    this.selectedItem.checked = true;
  }

}
