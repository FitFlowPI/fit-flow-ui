import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginPayload, LoginResponse } from '../models/login.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/api/v1/auth/authenticate';

  constructor(private http: HttpClient) {}

  authenticate(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, payload);
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.authenticate(payload).pipe(
      tap(response => {
        const token = response.data.token; // Adjust this according to your response structure
        localStorage.setItem('authToken', token); // Save token to local storage
      })
    );
  }

  logout(): void {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.post(`${environment.apiUrl}/auth/logout`, {}, { headers }).subscribe(
        () => {
          console.log('Successfully logged out'); // Log success message
          localStorage.removeItem('authToken'); // Clear token from local storage
          // Optionally, redirect to the login page
          window.location.href = '/login';
        },
        (error) => {
          console.error('Error logging out:', error); // Log any error
          // Even if the logout request fails, ensure token removal for safety
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
      );
    } else {
      console.warn('No token found during logout'); // Log a warning if no token exists
      window.location.href = '/login'; // Redirect directly if token isn't present
    }
  }
}
