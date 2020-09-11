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
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
    fullName: 'teach',
    language: 'GERMAN',
    level: 'A1',
    price_level: 'NORMAL',
    email: 'teacher1@gmail.com',
    status: 'DEACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 35,
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

  getListLecturer(): Observable<LecturerList[]> {
    // return this.http.get(`${apiUrl}/admin/teachers`).pipe(
    //   tap(_ => console.log('Call API get list lecturer!')),
    //   catchError(this.handleError<any>('Error!'))
    // );

    return of(FAKE_DATA).pipe(
      map(rs => rs.map(
        item =>
          LecturerList.fromResponse(item)
      ))
    );
  }

  getLecturerByLang(langId: number): Observable<LecturerList[]> {
    return this.http.get(`${apiUrl}/admin/teachers?language=${langId}`).pipe(
      tap(_ => console.log('Call API get lecturer by language ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  getLecturerById(id: number): Observable<Lecturer> {
    return this.http.get(`${apiUrl}/admin/teachers/${id}`).pipe(
      tap(_ => console.log('Call API get lecturer by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  addLecturerById(item: Lecturer): Observable<LecturerCRUDReponse> {
    return this.http.post(`${apiUrl}/admin/teachers`, item).pipe(
      tap(_ => console.log('Call API get lecturer by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  updateLecturerById(item: LecturerDetail): Observable<LecturerCRUDReponse> {
    return this.http.put(`${apiUrl}/admin/teachers/${item.id}`, item).pipe(
      tap(_ => console.log('Call API get lecturer by ID!')),
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
    this.logService.add(`LecturerService: ${message}`);
  }

}
