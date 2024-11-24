import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingDay } from '../models/training-day.model';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TrainingSheetService {

  constructor(private http: HttpClient) {
  }

  private chartsSubject = new BehaviorSubject<Array<TrainingDay>>(this.loadStoredCharts());
  charts$ = this.chartsSubject.asObservable();

  private loadStoredCharts(): Array<TrainingDay> {
    return JSON.parse(localStorage.getItem('charts') || '[]');
  }

  getTrainingDays(): Array<TrainingDay> {
    return this.loadStoredCharts();
  }

  updateTrainingDayList(charts: Array<TrainingDay>) {
    this.chartsSubject.next(charts);
    localStorage.setItem('charts', JSON.stringify(charts));
  }

  // Delete a chart by its ID, ensuring type safety
  deleteChart(chartId: string) {
    const charts = this.loadStoredCharts();
    const updatedCharts = charts.filter(chart => chart.id !== chartId); // Now comparing numbers
    this.updateTrainingDayList(updatedCharts); // Update BehaviorSubject and localStorage
  }

  // Update an existing chart
  updateTrainingDay(updatedChart: TrainingDay) {
    const charts = this.loadStoredCharts();
    const index = charts.findIndex(chart => chart.id === updatedChart.id); // Ensure matching by id (number)
    if (index !== -1) {
      charts[index] = updatedChart;
      this.updateTrainingDayList(charts); // Update BehaviorSubject and localStorage
    }
  }
}
