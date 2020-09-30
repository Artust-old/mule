import { Injectable } from '@angular/core';
import { Level } from '@common/models/level';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const FAKE_DATA = [
  {
    id: 1,
    name: 'A1'
  },
  {
    id: 2,
    name: 'A2'
  },
  {
    id: 3,
    name: 'B1'
  },
  {
    id: 4,
    name: 'B2'
  }
];
@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getLevel(): Observable<any> {
    return this.http.get(`${apiUrl}/levels`);
  }

  getLevelByLang(langId: number): Observable<any> {
    return this.http.get(`${apiUrl}/levels?id=${langId}`);
  }

}
