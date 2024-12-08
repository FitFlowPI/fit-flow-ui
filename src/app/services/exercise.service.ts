import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseRepsAndSets } from '../models/exercise-reps-and-sets.model';
import { environment } from '../../environments/environment'; // Update this path if needed

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = `${environment.apiUrl}/exercise`; // API URL to fetch exercises, adapt according to your backend.

  constructor(private http: HttpClient) { }

  // Fetch all exercises for the authenticated user
  getAllDefaultExercises(): Observable<any> {
    const token = this.getAuthToken(); // Retrieve the token
    console.log('Token being sent:', token); // Log the token for debugging
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to headers
    console.log('Headers being sent:', headers); // Log the headers for debugging
  
    // Update the URL to target the specific endpoint
    const url = `${this.apiUrl}/default`; 
    console.log('URL being called:', url); // Log the URL for debugging
  
    // Make the GET request
    return this.http.get<any>(url, { headers });
  }

  // Helper to fetch the auth token
  private getAuthToken(): string {
    const token = localStorage.getItem('authToken') || '';
    console.log('Token fetched from localStorage:', token); // Log the fetched token
    return token;
  }

  // Fetch exercises by creatorId
  getExercisesByCreator(creatorId: number): Observable<any[]> {
    const token = this.getAuthToken();  // Get the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Add the token to headers

    return this.http.get<any[]>(`${this.apiUrl}/creator/${creatorId}`, { headers });  // Fetch exercises by creatorId
  }
}
