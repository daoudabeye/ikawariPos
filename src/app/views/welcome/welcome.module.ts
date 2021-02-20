import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboadDefaultComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
