import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/update-password'; // Update with your backend endpoint

  constructor(private http: HttpClient) {}

  updatePassword(password: string, token: string, email: string): Observable<any> {
    const body = { password, token, email };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}