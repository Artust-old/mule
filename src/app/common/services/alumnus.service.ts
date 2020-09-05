import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import { LogService } from './log.service';
import { environment } from 'src/environments/environment';
import { Alumnus, AlumnusList, AlumnusDetail, AlumnusCRUDReponse } from '@common/models/alumnus';

const apiUrl = environment.apiUrl;

const FAKE_DATA: AlumnusList[] = [
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Không học',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Học chính thức',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 12345,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
];

const FAKE_REPONSE: AlumnusCRUDReponse = {
  id: 12,
  studentCode: 'ABC',
  age: 16,
  saleId: 123,
  createdDate: '02/20/2020',
  modifiedDate: '02/20/2020',
  createdBy: 9,
};

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class AlumnusService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getListAlumnus(): Observable<AlumnusList[]> {
    return this.http.get(`${apiUrl}/sale/students`, httpOptions).pipe(
      tap(_ => console.log('Call API get list alumnus!')),
      catchError(this.handleError<any>('Error!'))
    );

    // return of(FAKE_DATA).pipe(delay(2000));
  }

  getAlumnusBySaleId(saleId: number): Observable<AlumnusList[]> {
    return this.http.get(`${apiUrl}/sale/students?id=${saleId}`).pipe(
      tap(_ => console.log('Call API get alumnus by sale ID!')),
      catchError(this.handleError<any>('Error!'))
    );

    // return of(FAKE_DATA).pipe(delay(2000));
  }

  getAlumnusById(id: number): Observable<AlumnusDetail> {
    return this.http.get(`${apiUrl}/sale/students/${id}`).pipe(
      tap(_ => console.log('Call API get alumnus by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  addAlumnus(item: Alumnus): Observable<AlumnusCRUDReponse> {
    return this.http.post(`${apiUrl}/sale/students`, item).pipe(
      tap(_ => console.log('Call API get alumnus by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
    // console.log('Call API add alumnus!');

    // return of(FAKE_REPONSE).pipe(delay(2000));
  }

  updateAlumnus(item: AlumnusDetail): Observable<AlumnusCRUDReponse> {
    return this.http.put(`${apiUrl}/sale/students/${item.id}`, item).pipe(
      tap(rs => console.log('Call API update alumnus!')),
      catchError(this.handleError<any>('Error!'))
    );

    // console.log('Call API update alumnus!');
    // let source = FAKE_DATA.find(e => e.id === item.id);
    // source = Object.assign(source, item);
    // console.log(source);
    // return of(FAKE_REPONSE).pipe(delay(2000));
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
    this.logService.add(`AlumnusService: ${message}`);
  }
}
