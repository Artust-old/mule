import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { LecturerList, Lecturer, LecturerCRUDReponse, LecturerDetail } from '@common/models/lecturer';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

const FAKE_DATA = [
  {
    id: 1,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 2,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 3,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 4,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 5,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 6,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 7,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
];

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getListLecturer(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/teachers`);
    // return of(FAKE_DATA);
  }

  getLecturerByLang(langId: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/teachers?language=${langId}`);
  }

  getLecturerById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/teachers/${id}`);
    // return of(FAKE_DATA.find(e => e.id === id));
  }

  addLecture(item): Observable<any> {
    return this.http.post(`${apiUrl}/admin/teachers`, item);
  }

  updateLecturer(item): Observable<any> {
    return this.http.put(`${apiUrl}/admin/teachers/${item.id}`, item);
  }
}
