import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Guard to allow only certain VIP users
 */
@Injectable({
  providedIn: 'root',
})
export class VIPGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user?.displayName?.includes('test')) {
          return true;
        } else {
          console.log(
            '❗️This page is only available to a limited number of people.'
          );
          return this.route.parseUrl('/login'); // Create an object UrlTree where path information handled by Angular's router is stored and specify it as the return value.
        }
      })
    );
  }
}
