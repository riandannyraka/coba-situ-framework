import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BroadcasterService } from './broadcaster.service';
import { Injectable, Injector } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { OauthService } from './oauth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(
    private broadcasterService: BroadcasterService,
    private injector: Injector,
    private router: Router
    ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.authenticateRequest(req);
    return next.handle(authReq).pipe(
      tap((event) => {}),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.injector.get(OauthService).broadcastLogout();
          this.broadcasterService.notifBroadcast(true, {
            title: 'Failed',
            msg: `You're not authenticate`,
            timeout: 5000,
            theme: 'default',
            position: 'top-right',
            type: 'error'
          });
          return throwError(error);
        } else if (error.status === 403) {
          console.log('not allow');
          this.router.navigate(['/error/403']);
        } else if (error.status === 405) {
          console.log('not allow');
          // this.injector.get(OauthService).broadcastLogout();
          return throwError(error);
        } else if (error.status === 504) {
          this.broadcasterService.notifBroadcast(true, {
            title: 'Failed',
            msg: `Gateway Time-out`,
            timeout: 5000,
            theme: 'default',
            position: 'top-right',
            type: 'error'
          });
          return throwError(error);
        } else {
          this.broadcasterService.notifBroadcast(true, {
            title: 'Failed',
            msg: `Error API`,
            timeout: 5000,
            theme: 'default',
            position: 'top-right',
            type: 'error'
          });
          return throwError(error);
        }
      })
    );
  }

  authenticateRequest(request: HttpRequest<any>) {
    const token = this.injector.get(OauthService).retrieveAccessToken();
    if (token) {
      const duplicate = request.clone({
        // headers: request.headers.set('Authorization', 'Basic ' + btoa('tracerstudy:tr4c3rstuDy4pi')),
        headers: request.headers.set('Authorization', 'Bearer ' + token.token),
        // url: request.url.replace('https://', 'http://'),
      });
      return duplicate;
    }
    return request;
  }
}
