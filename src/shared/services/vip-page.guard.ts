import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { LocationService } from 'src/app/service/utilities/location.service';

@Injectable({
  providedIn: 'root'
})
export class VIPPageGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private locationService: LocationService,
    private route: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.user
      .pipe(
        take(1),
        map(user => {
          if (user?.displayName?.includes('test')) {
            return true;
          } else {
            console.log('❗️This page is only available to a limited number of people.')
            return this.route.parseUrl('/login'); // Create an object UrlTree where path information handled by Angular's router is stored and specify it as the return value.
          }
        })
      );
  }
}

