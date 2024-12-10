import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {ExerciseComponent} from "../../shared/exercise/exercise.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-training-day-exercise-select',
  standalone: true,
  imports: [
    ExerciseComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './training-day-exercise-select.component.html',
  styleUrl: './training-day-exercise-select.component.css'
})
export class TrainingDayExerciseSelectComponent implements OnInit {
  public exercises: Array<Exercise> = [];
  private trainingDayId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Access the `trainingDayId` from route params
    this.route.paramMap.subscribe(params => {
      this.trainingDayId = params.get('trainingDayId');
      console.log('Training Day ID received from route:', this.trainingDayId);
      
      if (this.trainingDayId) {
        this.loadExercisesFromChart(this.trainingDayId);
      } else {
        console.log('No trainingDayId found in the route');
      }
    });
  }

  private loadExercisesFromChart(trainingDayId: string | null) {
    if (trainingDayId) {
      console.log('Loading chart from LocalStorage with ID:', trainingDayId);

      // Get the chart array from local storage and parse it as an array
      const charts = JSON.parse(localStorage.getItem('charts') || '[]');

      // Find the chart with the matching ID
      const chart = charts.find((chart: any) => chart.id === trainingDayId);

      if (chart) {
        console.log('Chart found:', chart);
        this.exercises = chart.exercises || [];
        console.log('Exercises loaded:', this.exercises);
      } else {
        console.log('Chart not found or ID mismatch');
      }
    } else {
      console.log('Invalid trainingDayId');
    }
  }

  onPlay(exerciseId: string) {
    if (this.trainingDayId && exerciseId) {
      const route = `/training/exercise-start/${this.trainingDayId}/${exerciseId}`;
      console.log('Navigating to:', route);
      this.router.navigate([route]);
    } else {
      console.error('Invalid trainingDayId or exerciseId:', this.trainingDayId, exerciseId);
    }
  }
}
