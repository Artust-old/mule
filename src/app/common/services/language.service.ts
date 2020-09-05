import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Language } from '@common/models/language';

const apiUrl = environment.apiUrl;

const FAKE_DATA = [
  {
    id: 1,
    name: 'GERMAN'
  },
  {
    id: 2,
    name: 'FRENCH'
  },
  {
    id: 3,
    name: 'JAPANESE'
  },
  {
    id: 4,
    name: 'ENGLISH'
  },
  {
    id: 5,
    name: 'CHINESE'
  }
];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private http: HttpClient,
  ) { }

  getLanguage(): Observable<any> {
    return this.http.get(`${apiUrl}/languages`);
  }
}
