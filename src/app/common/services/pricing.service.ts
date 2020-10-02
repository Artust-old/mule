import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

const apiUrl = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(
    private http: HttpClient
  ) { }

  getListPricing(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/pricings`);
  }

  getPricingById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/admin/pricings/${id}`);
  }

  addPricing(item): Observable<any> {
    return this.http.post(`${apiUrl}/admin/pricings`, item);
  }

  updatePricing(item): Observable<any> {
    return this.http.put(`${apiUrl}/admin/pricings/${item.id}`, item);
  }
}
