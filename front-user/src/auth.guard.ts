import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access to the route
    } else {
      // Redirect the user to the login page or another route
      this.router.navigate(['/login']);
      return false; // Deny access to the route
    }
  }
}
