import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginPayload, LoginResponse } from '../models/login.model';

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
    localStorage.removeItem('authToken'); // Clear token from local storage
  }
}
