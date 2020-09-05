import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { AlumnusService } from '@common/services/alumnus.service';
import { LogService } from '@common/services/log.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './pages/auth/auth.module';

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
  providers: [AlumnusService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
