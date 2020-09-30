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
    fullName: 'Sale nek',
    email: 'sale@gmail.com',
    phone: '123',
    status: 'ACTIVE',
    joinedDate: '23/08/2020'
  },
  {
    id: 1,
    fullName: 'Phuong Dom',
    email: 'sale2@gmail.com',
    phone: '123',
    status: 'ACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 3,
    fullName: 'Phuong Dom 2',
    email: 'sale3@gmail.com',
    phone: '123',
    status: 'ACTIVE',
    joinedDate: '30/08/2020'
  },
  {
    id: 4,
    fullName: 'Phuong Dom 4',
    email: 'admin@gmail.com',
    phone: '123',
    status: 'ACTIVE',
    joinedDate: '30/08/2020'
  }
];

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient,
   ) { }

  getListSale(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/sales`);
    // return of(FAKE_DATA);
  }

  getSaleById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/sales/${id}`);
  }

  addSale(item): Observable<any> {
    return this.http.post(`${apiUrl}/admin/sales`, item);
  }

  updateSale(item): Observable<any> {
    return this.http.put(`${apiUrl}/admin/sales/${item.id}`, item);
  }

}
