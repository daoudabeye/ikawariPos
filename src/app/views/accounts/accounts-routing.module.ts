import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes: Routes = [
  {
    path: 'my-account',
    component: MyAccountComponent
  },
  {
    path: 'wallets',
    component: WalletsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
