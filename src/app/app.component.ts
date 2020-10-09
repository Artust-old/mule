import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticateService } from '@common/services/authenticate.service';

const jwtHelper = new JwtHelperService();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mule';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  token: string;

  constructor(
    private authenticateService: AuthenticateService,
  ) {
    this.token = this.currentUser?.response?.accessToken;
  }

  ngOnInit(): void {
    jwtHelper.isTokenExpired(this.token) ? this.authenticateService.logout() : null;
  }

  ngOnDestroy(): void {
  }

}
