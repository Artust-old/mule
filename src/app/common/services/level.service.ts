import { Injectable } from '@angular/core';
import { Level } from '@common/models/level';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getLevel(): Observable<Level[]> {
    return this.http.get(`${apiUrl}/levels`).pipe(
      tap(_ => console.log('Call API get list level!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  getLevelByLang(langId: number): Observable<Level[]> {
    return this.http.get(`${apiUrl}/levels?id=${langId}`).pipe(
      tap(_ => console.log('Call API get list level!')),
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
