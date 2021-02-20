import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { KycApplicationComponent } from './kyc-application/kyc-application.component';
import { KycFormComponent } from './kyc-form/kyc-form.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PagesRoutingModule,
    NgbModule,
    SharedComponentsModule,
    NgxDropzoneModule,
  ],
  declarations: [UserProfileComponent, KycApplicationComponent, KycFormComponent],
})
export class PagesModule { }
