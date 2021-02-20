import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { WalletsComponent } from './wallets/wallets.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountsRoutingModule } from './accounts-routing.module';



@NgModule({
  declarations: [MyAccountComponent, WalletsComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
