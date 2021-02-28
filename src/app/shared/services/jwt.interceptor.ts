import { Injectable, Optional } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authStorage: OAuthStorage,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig) { }

    private checkUrl(url: string): boolean {
        let found = this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
        return !!found;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url

        let url = request.url.toLowerCase();

        if (!this.moduleConfig) return next.handle(request);
        if (!this.moduleConfig.resourceServer) return next.handle(request);
        if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(request);
        if (!this.checkUrl(url)) return next.handle(request);

        let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

        if (sendAccessToken) {

            let token = this.authStorage.getItem('access_token');
            let header = 'Bearer ' + token;

            let headers = request.headers
            .set('Authorization', header);
            request = request.clone({ headers });
        }

        return next.handle(request);
    }
}