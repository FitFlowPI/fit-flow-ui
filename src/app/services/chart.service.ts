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

  private loadStoredCharts(): Array<GymChart> {
    return JSON.parse(localStorage.getItem('charts') || '[]');
  }

  getCharts(): Array<GymChart> {
    return this.loadStoredCharts();
  }

  updateCharts(charts: Array<GymChart>) {
    this.chartsSubject.next(charts);
    localStorage.setItem('charts', JSON.stringify(charts));
  }

  // Delete a chart by its ID, ensuring type safety
  deleteChart(chartId: number) {
    const charts = this.loadStoredCharts();
    const updatedCharts = charts.filter(chart => chart.id !== chartId); // Now comparing numbers
    this.updateCharts(updatedCharts); // Update BehaviorSubject and localStorage
  }

  // Update an existing chart
  updateChart(updatedChart: GymChart) {
    const charts = this.loadStoredCharts();
    const index = charts.findIndex(chart => chart.id === updatedChart.id); // Ensure matching by id (number)
    if (index !== -1) {
      charts[index] = updatedChart;
      this.updateCharts(charts); // Update BehaviorSubject and localStorage
    }
  }
}
