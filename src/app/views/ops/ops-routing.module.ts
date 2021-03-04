import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { OperationComponent } from './operation/operation.component';
import { OrdersComponent } from './orders/orders.component';
import { PayOrderComponent } from './pay-order/pay-order.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: 'buy-sell',
    component: BuySellComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'payorder',
    component: PayOrderComponent
  },
  {
    path: 'trans',
    component: TransactionsComponent
  },
  {
    path: 'operation',
    component: OperationComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpsRoutingModule { }
