import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticateService } from '@common/services/authenticate.service';
import { Router } from '@angular/router';

const jwtHelper = new JwtHelperService();

@Injectable()
export class ExpireTokenInterceptor implements HttpInterceptor {

  constructor(
    private authenticateService: AuthenticateService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser?.response?.accessToken;
    if (currentUser && token) {
      if (jwtHelper.isTokenExpired(token)) {
        this.authenticateService.logout();
      }
    }
    return next.handle(request);
  }
}
