import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) {
    return true; // Allow access if the token exists
  } else {
    router.navigate(['/user/login']); // Redirect to login if not logged in
    console.log('User not authenticated, redirecting to login');
    return false; // Deny access
  }
};
