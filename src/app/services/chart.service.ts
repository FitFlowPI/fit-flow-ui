import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingDay } from '../models/gym-chart.model';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {
  }

  private chartsSubject = new BehaviorSubject<Array<TrainingDay>>(this.loadStoredCharts());
  charts$ = this.chartsSubject.asObservable();


  getCharts() {
    // return http.get()
  }

  private loadStoredCharts(): Array<TrainingDay> {
    return JSON.parse(localStorage.getItem('charts') || '[]');
  }

  updateCharts(charts: Array<TrainingDay>) {
    this.chartsSubject.next(charts);
    localStorage.setItem('charts', JSON.stringify(charts));
  }
}
