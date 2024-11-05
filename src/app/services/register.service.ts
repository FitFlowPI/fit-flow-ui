import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterPayload, RegisterResponse } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}

  registerUser(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registerUrl, payload);
  }
}
