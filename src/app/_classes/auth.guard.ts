import { CanActivate, Router } from '@angular/router';
import { OauthService } from '../_services/oauth.service';
import { TokenFactory } from './token.factory';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private oauthService: OauthService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.retrieveAccessToken().token) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private tokenFactory = new TokenFactory();
  constructor(
    private router: Router,
    private oauthService: OauthService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.retrieveAccessToken().token) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RectorGuard implements CanActivate {
  constructor(
    private router: Router,
    private oauthService: OauthService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.checkScope('old-rektor')) {
      return true;
    } else {
      this.router.navigate(['/error/403']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class PegawaiGuard implements CanActivate {
  constructor(
    private router: Router,
    private oauthService: OauthService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.checkScope('old-pegawai')) {
      return true;
    } else {
      this.router.navigate(['/error/403']);
      return false;
    }
  }
}
