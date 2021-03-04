import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/sendForm';
import { OperationConfig, OperationType, PaymentForm, PinCodeCheck } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private http: HttpClient
  ) { }

  getConfig(operation: OperationType){
    return this.http.get<OperationConfig>(`${environment.apiMainUrl}/api/ops/config`, {params:{'type': OperationType[operation]}});
  }

}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  findAllOrders() {
    return this.http.get<Order[]>(`${environment.apiMainUrl}/api/ops/findAll`);
  }

  findOrder(id) {
    return this.http.get<Order>(`${environment.apiMainUrl}/api/ops/find/${id}`);
  }

  checkOrderPin(pinRequest: PinCodeCheck) {
    return this.http.post<PinCodeCheck>(`${environment.apiMainUrl}/api/ops/pinCheck`, pinRequest);
  }

  payOrder(paymentForm: PaymentForm) {
    return this.http.post<PaymentForm>(`${environment.apiMainUrl}/api/ops/payOrder`, paymentForm);
  }

}
