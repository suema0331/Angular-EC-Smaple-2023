import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/service/utilities/location.service';
import { AuthService } from './auth.service';

/**
 * Guard to allow logged-in users only
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private locationService: LocationService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      console.log('❗️This page can be accessed after logging in.');
      this.locationService.navigateTo1_4();
      return false;
    }
    return true;
  }
}
