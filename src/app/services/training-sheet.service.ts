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

  private trainingDaySubject = new BehaviorSubject<Array<TrainingDay>>(this.loadStoredTrainingDays());
  trainingDays$ = this.trainingDaySubject.asObservable();

  private loadStoredTrainingDays(): Array<TrainingDay> {
    return JSON.parse(localStorage.getItem('trainingDays') || '[]');
  }

  getTrainingDays(): Array<TrainingDay> {
    return this.loadStoredTrainingDays();
  }

  updateTrainingDayList(trainingDays: Array<TrainingDay>) {
    this.trainingDaySubject.next(trainingDays);
    localStorage.setItem('charts', JSON.stringify(trainingDays));
  }

  // Delete a chart by its ID, ensuring type safety
  deleteChart(trainingDayId: string) {
    const trainingDays = this.loadStoredTrainingDays();
    const updatedCharts = trainingDays.filter(trainingDay => trainingDay.id !== trainingDayId); // Now comparing numbers
    this.updateTrainingDayList(updatedCharts); // Update BehaviorSubject and localStorage
  }

  // Update an existing chart
  updateTrainingDay(updatedTrainingDay: TrainingDay) {
    const trainingDays = this.loadStoredTrainingDays();
    const index = trainingDays.findIndex(trainingDay => trainingDay.id === updatedTrainingDay.id); // Ensure matching by id (number)
    if (index !== -1) {
      trainingDays[index] = updatedTrainingDay;
      this.updateTrainingDayList(trainingDays); // Update BehaviorSubject and localStorage
    }
  }

  completeTraining(payload: { trainingDay: TrainingDay, timeSpent: number }) {
    const trainingDays = this.loadStoredTrainingDays();
    const index = trainingDays.findIndex(trainingDay => trainingDay.id === payload.trainingDay.id);

    if (index !== -1) {
      // Reset the exercises' doneCount and isDone properties
      trainingDays[index].exercises.forEach(exercise => {
        exercise.doneCount = 0; // Reset doneCount
        exercise.isDone = false; // Reset isDone
      });

      // Add the time spent to the trainingDay object
      trainingDays[index].timeSpent = payload.timeSpent;

      // Save the updated chart list to local storage
      this.updateTrainingDayList(trainingDays);
    }
  }
}
