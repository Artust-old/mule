import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay, timeout } from 'rxjs/operators';
import { ClassDetail, Class, ClassCRUDReponse, ClassList } from '@common/models/class';

const apiUrl = environment.apiUrl;

const FAKE_DATA: ClassList[] = [
  {
    id: 1,
    classCode: 'DEA1031',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'OFFICIAL',
    sale: 'Sale',
  }, {
    id: 2,
    classCode: 'DEA1032',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'TRIAL',
    sale: 'Sale',
  }, {
    id: 3,
    classCode: 'DEA1033',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'CANCELLED',
    sale: 'Sale',
  }, {
    id: 4,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'COMPLETED',
    sale: 'Sale',
  }, {
    id: 5,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'TRIAL',
    sale: 'Sales',
  }, {
    id: 6,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'OFFICIAL',
    sale: 'Sale',
  }, {
    id: 7,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,3,5',
    time: '1600623000000',
    quantity: '5/6',
    status: 'CREATED',
    sale: 'Sale',
  },
];

const FAKE_DETAIL = {
  id: 1,
  pricing: 1000,
  teacherName: 'TheTechies',
  time: '1600623000000',
  weekday: '2,3,5',
  sale: 'Phan Hồng Ánh',
  classCode: 'DEA1034',
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient,
  ) { }

  getListClass(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/classes`);
    // return of(FAKE_DATA);
  }

  getClassById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/classes/${id}`);
    // return of(FAKE_DETAIL);
  }

  addClass(item): Observable<any> {
    return this.http.post(`${apiUrl}/admin/classes`, item);
  }

  updateClass(item): Observable<any> {
    return this.http.put(`${apiUrl}/admin/classes/${item.id}`, item);
  }
}
