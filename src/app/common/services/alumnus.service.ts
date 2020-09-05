import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alumnus, AlumnusList, AlumnusDetail, AlumnusCRUDReponse } from '@common/models/alumnus';
import { notEqual } from 'assert';

const apiUrl = environment.apiUrl;

const FAKE_DATA: any[] = [
  {
    id: 1,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'TRIAL',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 2,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1034',
    email: 'harmenporter@gmail.com',
    status: 'ABORTED',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020',
    note: 'aloalo',
  },
  {
    id: 3,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Học chính thức',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 4,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 5,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'TRIAL',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 6,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1034',
    email: 'harmenporter@gmail.com',
    status: 'FINISHED',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 7,
    fullName: 'Harmen Porter',
    level: 'A1',
    classCode: 'DEA1023',
    email: 'harmenporter@gmail.com',
    status: 'Đã học xong',
    sale: 'Nguyễn Vũ Ngọc Diệp',
    joinedDate: '20/02/2020'
  },
  {
    id: 8,
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

const FAKE_STUDENT = {
  email: "student1updated@gmail.com",
  fullName: "student1",
  facebookLink: "link",
  age: 0,
  language: 1,
  level: 1,
  quantity: 4,
  expectedTime: 1600623000000,
  expectedWeekday: "2,5",
  expectedClass: 1,
  note: "none",
  status: 'WAITING'
};

@Injectable({
  providedIn: 'root'
})
export class AlumnusService {

  constructor(
    private http: HttpClient,
  ) { }

  getListAlumnus(): Observable<any> {
    return this.http.get(`${apiUrl}/sale/students`);
    // return of(FAKE_DATA);
  }

  getAlumnusBySaleId(saleId?: number): Observable<any> {
    if (saleId)
      return this.http.get(`${apiUrl}/sale/students?id=${saleId}`);
    else
      return this.http.get(`${apiUrl}/sale/students`);
    // return of(FAKE_DATA);
  }

  getAlumnusById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/sale/students/${id}`);
    // return of(FAKE_STUDENT);
  }

  addAlumnus(item: any): Observable<any> {
    return this.http.post(`${apiUrl}/sale/students`, item);
    // return of(FAKE_REPONSE);
  }

  updateAlumnus(item: any): Observable<any> {
    return this.http.put(`${apiUrl}/sale/students/${item.id}`, item);
    // return of(FAKE_REPONSE);
  }

  changeStatusAlumnus(item): Observable<any> {
    return this.http.put(`${apiUrl}/sale/students/${item.id}/status`, item);
  }

  changeClassAlumnus(item): Observable<any> {
    return this.http.put(`${apiUrl}/sale/students/${item.id}/class`, item);
  }
}
