import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './pages/auth/auth.module';
import { TimeoutInterceptor } from '@common/helpers/timeout.interceptor';
import { JwtInterceptor } from '@common/helpers/jwt.interceptor';
import { ExpireTokenInterceptor } from '@common/helpers/expire-token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    HeaderModule,
    FooterModule,

    AuthModule,
    HomepageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ExpireTokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
