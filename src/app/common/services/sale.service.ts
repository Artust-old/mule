import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, of } from 'rxjs';
import { SaleList, Sale, SaleDetail, SaleCRUDReponse } from '@common/models/sale';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

const FAKE_DATA = [
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
  {
    id: 2,
    fullName: 'Sale',
    email: 'sale@gmail.com',
    phone: null,
    status: 'ACTIVE',
    joinedDate: '23/08/2020',
  },
];

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  getListSale(): Observable<SaleList[]> {
    return this.http.get(`${apiUrl}/admin/sales`).pipe(
      tap(_ => console.log('Call API get list sale!')),
      catchError(this.handleError<any>('Error!'))
    );

    // return of(FAKE_DATA);
  }

  getSaleById(id: number): Observable<Sale> {
    return this.http.get(`${apiUrl}/admin/sales/${id}`).pipe(
      tap(_ => console.log('Call API get sale by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  addSaleById(item: Sale): Observable<SaleCRUDReponse> {
    return this.http.post(`${apiUrl}/admin/sales`, item).pipe(
      tap(_ => console.log('Call API get sale by ID!')),
      catchError(this.handleError<any>('Error!'))
    );
  }

  updateSaleById(item: SaleDetail): Observable<SaleCRUDReponse> {
    return this.http.put(`${apiUrl}/admin/sales/${item.id}`, item).pipe(
      tap(_ => console.log('Call API get sale by ID!')),
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
    this.logService.add(`SaleService: ${message}`);
  }

}
