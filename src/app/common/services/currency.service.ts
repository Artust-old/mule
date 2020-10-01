import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient,
  ) { }

  getListCurrency(): Observable<any> {
    return this.http.get(`${apiUrl}/currencies`);
  }
}
