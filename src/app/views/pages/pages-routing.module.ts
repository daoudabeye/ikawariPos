import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KycApplicationComponent } from './kyc-application/kyc-application.component';
import { KycFormComponent } from './kyc-form/kyc-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
      path: 'kyc-application',
      component: KycApplicationComponent
    },
    {
      path: 'kyc-form',
      component: KycFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
