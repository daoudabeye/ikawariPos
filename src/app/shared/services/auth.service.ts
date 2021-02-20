import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { User } from "../models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Token } from "../models/token";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = false;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient,
    private oauthService: OAuthService
  ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get userValue(): User {
    return this.currentUserSubject.value;
}

  getuser() {
    return of({});
  }

  signin(credentials, onSuccess, onFailed) {

    var username = credentials['username'];
    var password = credentials['password'];

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.initLoginFlow();
    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password).then((userinfo) => {
      //let claims = this.oauthService.getIdentityClaims();
      //if (claims) console.log('given_name', userinfo);
      this.authenticated = true;

      var user = new User();
      user.username = userinfo.preferred_username;
      user.firstName = userinfo.family_name;
      user.lastName = userinfo.last_name;
      user.email = userinfo.email;
      user.name = userinfo.name;

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      
      onSuccess();
    },error =>{
      onFailed(error);
    });
  }

  signout() {
    this.authenticated = false;
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();
    sessionStorage.clear();
    this.router.navigateByUrl("/sessions/signin");
    this.currentUserSubject.next(null);
  }

}


export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://key.ikanet.ml/auth/realms/IKAWARI',
  // Login-Url
  tokenEndpoint: "https://key.ikanet.ml/auth/realms/IKAWARI/protocol/openid-connect/token",
  // Url with user info endpoint
  // This endpont is described by OIDC and provides data about the loggin user
  // This sample uses it, because we don't get an id_token when we use the password flow
  // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
  userinfoEndpoint : "https://key.ikanet.ml/auth/realms/IKAWARI/protocol/openid-connect/userinfo",

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  // The SPA's id. Register SPA with this id at the auth-server
  clientId : "ikawari-web-app",

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  // set the scope for the permissions the client should request
  scope: "openid",

  // Set a dummy secret
  // Please note that the auth-server used here demand the client to transmit a client secret, although
  // the standard explicitly cites that the password flow can also be used without it. Using a client secret
  // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
  // Using such a dummy secret is as safe as using no secret.
  dummyClientSecret: "9779dbf0-cf2f-4f75-abbb-335e7aef226f",

  oidc: false,
  showDebugInformation: true,
};
