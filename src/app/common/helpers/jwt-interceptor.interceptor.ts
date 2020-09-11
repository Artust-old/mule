import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateService } from '@common/services/authenticate.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authenticateService: AuthenticateService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authenticateService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = true;
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
