import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  role = '';

  constructor(private authService: AuthService, private router: Router,
              private cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {

    if (this.cookieService.get('user-id')) {
      return this.getAccess(route);
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }

  async getAccess(route) {
    const user = await this.authService.getById(this.cookieService.get('user-id'));
    this.role = await user.role;
    if (route.data['roles'].some(ai => this.role.toUpperCase().includes(ai))) {
      return true;
    } else {
      await this.router.navigateByUrl('/404');
      return false;
    }
  }

}

@Injectable()
export class UnAuthorizationGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {

    if (!this.cookieService.get('user-id')) {
      return true;
    } else {
      this.router.navigateByUrl('/404');
      return false;
    }

  }

}


