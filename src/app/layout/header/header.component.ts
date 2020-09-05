import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '@common/services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: boolean;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
  ) {
    this.authService.currentUser.subscribe(rs => {
      rs ? this.login = false : this.login = true;
    });
  }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/user']);
  }

  // handleLogIn(): void {
  //   this.login = false;
  // }

  // handleLogOut(e): void {
  //   this.login = e;
  // }

}
