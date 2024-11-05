import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GymChart } from '../models/gym-chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chartsSubject = new BehaviorSubject<Array<GymChart>>(this.loadStoredCharts());
  charts$ = this.chartsSubject.asObservable();

  private loadStoredCharts(): Array<GymChart> {
    return JSON.parse(localStorage.getItem('charts') || '[]');
  }

  updateCharts(charts: Array<GymChart>) {
    this.chartsSubject.next(charts);
    localStorage.setItem('charts', JSON.stringify(charts));
  }
}
