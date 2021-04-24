import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizerService } from './authorizer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authorizerService: AuthorizerService,
  ) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authorizerService.isAuthorized();
  }


}
