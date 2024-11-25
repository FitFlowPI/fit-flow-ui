import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingSheetService } from '../../services/training-sheet.service';
import { TrainingDay } from '../../models/training-day.model';
import { Exercise } from '../../models/exercise.model';
import { NgForOf } from '@angular/common';
import { NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-training-day-start',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './training-day-start.component.html',
  styleUrls: ['./training-day-start.component.css'],
  animations: [
    trigger('slideInAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class TrainingDayStartComponent implements OnInit, OnDestroy {
  chartId: string | null = null;
  trainingDay: TrainingDay | undefined;
  timer: number = 0;  // Total time in seconds
  interval: any;
  formattedTime: string = '';  // To display the formatted time
  currentExerciseIndex: number = 0;  // To track the current exercise index

  constructor(
    private route: ActivatedRoute,
    private trainingSheetService: TrainingSheetService,
    private router: Router
  ) {}

  ngOnInit() {
    const chartId = this.route.snapshot.paramMap.get('chartId');
    console.log('Chart ID:', chartId);

    if (chartId) {
      const allTrainingDays = this.trainingSheetService.getTrainingDays();
      console.log('All Training Days:', allTrainingDays);

      this.trainingDay = allTrainingDays.find(chart => chart.id.toString() === chartId);
      console.log('Training Day:', this.trainingDay);
    } else {
      console.error("Chart ID not found in route.");
    }

    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer++;
      this.updateFormattedTime();  // Update the formatted time every second
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  updateFormattedTime() {
    const hours = Math.floor(this.timer / 3600);  // Get total hours
    const minutes = Math.floor((this.timer % 3600) / 60);  // Get remaining minutes
    const seconds = this.timer % 60;  // Get remaining seconds

    if (hours > 0) {
      this.formattedTime = `${hours} hora${hours > 1 ? 's' : ''} ${minutes} minuto${minutes !== 1 ? 's' : ''} ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      this.formattedTime = `${minutes} minuto${minutes > 1 ? 's' : ''} ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else {
      this.formattedTime = `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    }
  }

  markCurrentExerciseDone() {
    const exercise = this.trainingDay?.exercises[this.currentExerciseIndex];
    if (exercise) {
      // Ensure doneCount is initialized to 0 if undefined
      const doneCount = exercise.doneCount ?? 0;  // If doneCount is undefined, default to 0
      if (doneCount < exercise.series) {
        exercise.doneCount = doneCount + 1;
        if (exercise.doneCount === exercise.series) {
          exercise.isDone = true;
        }
        this.trainingSheetService.updateTrainingDay(this.trainingDay!);
      }
    }
  }

  goToPreviousExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
    }
  }
  
  goToNextExercise() {
    if (this.trainingDay && this.trainingDay.exercises) {
      const nextIndex = this.currentExerciseIndex + 1;
      if (nextIndex < this.trainingDay.exercises.length) {
        this.currentExerciseIndex = nextIndex;
      }
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onCompleteTraining() {
    console.log("Training completed!");
    if (this.trainingDay) {
      // Reset all exercises
      this.trainingDay.exercises.forEach(exercise => {
        exercise.doneCount = 0;
        exercise.isDone = false;
      });
  
      // Create a payload with the training day and time data
      const payload = {
        trainingDay: this.trainingDay,
        timeSpent: this.timer,  // Total time spent during the training session
      };
  
      // Send the payload to the TrainingSheetService to save to local storage
      this.trainingSheetService.completeTraining(payload);
  
      // Navigate to the next page after completion
      this.router.navigate(['/training/training-day-select']);
    }
  }

  trackById(index: number, exercise: Exercise): string {
    return exercise.id.toString();  // Ensure you're using the unique identifier of each exercise
  }
}
