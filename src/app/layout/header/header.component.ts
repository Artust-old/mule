import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleLogIn(): void {
    this.login = false;
  }

  handleLogOut(e): void {
    this.login = e;
  }

}
