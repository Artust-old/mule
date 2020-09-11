import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import { ClassDetail, Class, ClassCRUDReponse, ClassList } from '@common/models/class';

const apiUrl = environment.apiUrl;

const FAKE_DATA: ClassList[] = [
  {
    id: 1,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 2,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 3,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 4,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 5,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 6,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  }, {
    id: 7,
    classCode: 'DEA1034',
    teacherName: 'Harmen Porter',
    teacherLink: 'www.facebook.com/amoniac',
    language: 'Tiếng Đức',
    level: 'A1',
    weekday: 'Thứ 2,3,5',
    time: '21h - 23h (DE)',
    quantity: '5/6',
    status: 'Chính thức',
    sale: 'Sale',
  },
];

const FAKE_DETAIL: ClassDetail = {
  id: 1,
  pricing: 1000,
  teacher: 123,
  time: '21h - 23h (DE)',
  weekday: 'Thứ 2,3,5',
  sale: 'Sale',
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getListClass(): Observable<ClassList[]> {
    return this.http.get(`${apiUrl}/admin/classes`).pipe(
      tap(_ => console.log('Call API get list class!')),
      catchError(this.handleError<any>('Error!'))
    );

    // return of(FAKE_DATA).pipe(delay(2000));
  }

  getClassById(id: number): Observable<Class> {
    return this.http.get(`${apiUrl}/admin/classes/${id}`).pipe(
      tap(_ => console.log('Call API get class by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  addClass(item: Class): Observable<ClassCRUDReponse> {
    return this.http.post(`${apiUrl}/admin/classes`, item).pipe(
      tap(_ => console.log('Call API get class by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  updateClass(item: ClassDetail): Observable<ClassCRUDReponse> {
    return this.http.put(`${apiUrl}/admin/classes/${item.id}`, item).pipe(
      tap(_ => console.log('Call API get class by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logService.add(`ClassService: ${message}`);
  }
}
