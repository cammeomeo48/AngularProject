import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Customer {
  Id: string;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

export interface CustomerType {
  CustomerTypeId: number;
  CustomterTypeName: string;
  Customers: Customer[];
}

@Injectable({
  providedIn: 'root',
})
export class Ex18Service {
  customer_url = '/assets/dataset/cusstomer.json';
  constructor(private _http: HttpClient) {}
  getCustomerTypes(): Observable<CustomerType[]> {
    return this._http.get<CustomerType[]>(this.customer_url);
  }
}
