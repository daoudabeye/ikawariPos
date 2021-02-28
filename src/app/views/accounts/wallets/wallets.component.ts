import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/shared/models/wallet';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {

  wallets: Wallet[];

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.walletService.findMyWallets().
    subscribe((w: Wallet[]) => {
      this.wallets = w;
    });
  }

}
