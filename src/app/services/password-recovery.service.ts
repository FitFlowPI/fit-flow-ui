import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth/password-recovery';

  constructor(private http: HttpClient) {}

  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email }, { responseType: 'text' });
  }
}
