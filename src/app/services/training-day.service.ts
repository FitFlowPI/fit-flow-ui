import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingDayService {
  private baseUrl = `${environment.apiUrl}/training-day`;

  constructor(private http: HttpClient) {}

  private getAuthToken(): string {
    // Replace this with your logic for retrieving the token
    return localStorage.getItem('authToken') || '';
  }

  createTrainingDay(request: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.post(`${this.baseUrl}/create`, request, { headers });
  }

  getAllTrainingDays(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get(this.baseUrl, { headers });
  }

  getTrainingDayById(trainingDayId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get(`${this.baseUrl}/${trainingDayId}`, { headers });
  }

  updateTrainingDay(trainingDayId: string, request: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.put(`${this.baseUrl}/${trainingDayId}`, request, { headers });
  }

  deleteTrainingDay(trainingDayId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.delete(`${this.baseUrl}/${trainingDayId}`, { headers });
  }

  addExerciseToTrainingDay(trainingDayId: string, request: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.post(`${this.baseUrl}/${trainingDayId}/exercise`, request, { headers });
  }

  updateExerciseInTrainingDay(trainingDayId: string, exerciseId: number, request: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.put(`${this.baseUrl}/${trainingDayId}/exercise/${exerciseId}`, request, { headers });
  }

  removeExerciseFromTrainingDay(trainingDayId: string, exerciseId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.delete(`${this.baseUrl}/${trainingDayId}/exercise/${exerciseId}`, { headers });
  }
}
