import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Wallet } from '../models/wallet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient
  ) { }

  findMyWallets() {
    return this.http.get<Wallet[]>(`${environment.apiMainUrl}/api/wallet/myWallets`);
  }

  findMyWallet(type: string) {

    let params = new HttpParams();
    params = params.append('type', type);

    return this.http.get<Wallet[]>(`${environment.apiMainUrl}/api/wallet/myWallets`, {params: params});
  }

}
