import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay, timeout } from 'rxjs/operators';
import { ClassDetail, Class, ClassCRUDReponse, ClassList } from '@common/models/class';

const apiUrl = environment.apiUrl;

const FAKE_DATA = [
  {
    id: 1,
    classCode: 'CL0001',
    teacherName: 'teach',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A2, A1',
    weekday: null,
    time: 'Everyday',
    quantity: '0/1',
    status: 'TRIAL',
    sale: 'Sale'
  },
  {
    id: 2,
    classCode: 'CL0002',
    teacherName: 'teach2',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A1',
    weekday: null,
    time: 'Everyday',
    quantity: '0/1',
    status: 'OFFICIAL',
    sale: 'Sale'
  },
  {
    id: 3,
    classCode: 'CL0003',
    teacherName: 'teach2',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A1',
    weekday: '2,4',
    time: 'Everyday',
    quantity: '0/1',
    status: 'OFFICIAL',
    sale: 'Sale'
  },
  {
    id: 4,
    classCode: 'CL0002',
    teacherName: 'teach2',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A1',
    weekday: '5,6',
    time: 'Everyday',
    quantity: '0/1',
    status: 'OFFICIAL',
    sale: 'Sale'
  },
  {
    id: 5,
    classCode: 'CL0005',
    teacherName: 'teach2',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A1',
    weekday: null,
    time: 'Everyday',
    quantity: '0/1',
    status: 'OFFICIAL',
    sale: 'Sale'
  },
  {
    id: 6,
    classCode: 'CL0006',
    teacherName: 'teach2',
    teacherLink: 'link',
    language: 'GERMAN',
    level: 'A1',
    weekday: null,
    time: 'Everyday',
    quantity: '0/1',
    status: 'OFFICIAL',
    sale: 'Sale'
  },
];

const FAKE_CLASS = {
  id: 1,
  pricing: 1,
  teacher: 1,
  time: 'Everyday',
  weekday: null,
  sale: 2,
  real_price: 1590
} 

const FAKE_ALUMNUS = [
  {
    id: 1,
    fullName: 'student',
    sale: 'Sale nek',
    status: 'OFFICIAL',
    createdBy: 'Sale nek',
    attendance: 0
  },
  {
    id: 6,
    fullName: 'student-updated',
    sale: 'Sale nek',
    status: 'TRIAL',
    createdBy: 'Sale nek',
    attendance: 1
  }
];

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
    // return of(FAKE_CLASS);
  }

  getAlumnusInClass(classId: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/classes/${classId}/students`);
    // return of(FAKE_ALUMNUS);
  }

  addClass(item): Observable<any> {
    return this.http.post(`${apiUrl}/admin/classes`, item);
  }

  updateClass(item): Observable<any> {
    return this.http.put(`${apiUrl}/admin/classes/${item.id}`, item);
  }
}
