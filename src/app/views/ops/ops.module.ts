import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { OpsRoutingModule } from './ops-routing.module';
import { OperationComponent } from './operation/operation.component';
import { FormWizardModule } from 'src/app/shared/components/form-wizard/form-wizard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { PayOrderComponent } from './pay-order/pay-order.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [BuySellComponent, OrdersComponent, TransactionsComponent, OperationComponent, PayOrderComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    OpsRoutingModule,
    FormWizardModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    NgWizardModule.forRoot(ngWizardConfig),
    MatSelectCountryModule.forRoot('fr'),
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule
  ]
})
export class OpsModule { }
