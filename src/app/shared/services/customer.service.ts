import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/sendForm';
import { OperationConfig, OperationType } from '../models/operation';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  findByMobileNumber(mobileNumber){
    return this.http.get<Customer>(`${environment.apiMainUrl}/api/cus/mobile`, {params:{'mobileNumber': mobileNumber}});
  }

}
