import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private router: Router) {
    this.logout();
  }

  private logout() {
    localStorage.removeItem('authToken'); // Clear the token
    this.router.navigate(['/user/login']); // Redirect to login
  }
}
