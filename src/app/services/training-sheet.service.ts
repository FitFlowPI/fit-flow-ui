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

  completeTraining(payload: { trainingDay: TrainingDay, timeSpent: number }) {
    const charts = this.loadStoredCharts();
    const index = charts.findIndex(chart => chart.id === payload.trainingDay.id);
  
    if (index !== -1) {
      // Reset the exercises' doneCount and isDone properties
      charts[index].exercises.forEach(exercise => {
        exercise.doneCount = 0; // Reset doneCount
        exercise.isDone = false; // Reset isDone
      });
  
      // Add the time spent to the trainingDay object
      charts[index].timeSpent = payload.timeSpent;
  
      // Save the updated chart list to local storage
      this.updateTrainingDayList(charts);
    }
  }
}
