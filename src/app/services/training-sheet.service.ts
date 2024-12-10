import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingDay } from '../models/training-day.model';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TrainingSheetService {
  constructor(private http: HttpClient) {}

  private trainingDaySubject = new BehaviorSubject<Array<TrainingDay>>(
    this.loadStoredTrainingDays()
  );
  trainingDays$ = this.trainingDaySubject.asObservable();

  private loadStoredTrainingDays(): Array<TrainingDay> {
    return JSON.parse(localStorage.getItem('trainingDays') || '[]');
  }

  updateTrainingDayList(trainingDays: Array<TrainingDay>) {
    this.trainingDaySubject.next(trainingDays);
    // Update localStorage with the correct key 'trainingDays'
    localStorage.setItem('trainingDays', JSON.stringify(trainingDays));
  }

  // Delete a chart by its ID, ensuring type safety
  deleteChart(trainingDayId: string) {
    const trainingDays = this.loadStoredTrainingDays();
    const updatedCharts = trainingDays.filter(
      (trainingDay) => trainingDay.id !== trainingDayId
    ); // Now comparing numbers
    this.updateTrainingDayList(updatedCharts); // Update BehaviorSubject and localStorage
  }
}
