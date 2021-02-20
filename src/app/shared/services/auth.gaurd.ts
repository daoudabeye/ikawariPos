import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private oauthService: OAuthService
  ) { }

  canActivate() {
    //if (this.auth.authenticated) {
      //return true;
    //}

    if(this.oauthService.hasValidAccessToken()){
      return true;
    }

    this.router.navigateByUrl('/sessions/signin');
  }
}
