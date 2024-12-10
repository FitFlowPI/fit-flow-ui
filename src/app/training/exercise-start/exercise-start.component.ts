import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faAngleDown,
  faBackwardStep,
  faBars, faCancel, faCheck,
  faDumbbell,
  faPause,
  faPencil, faRepeat,
  faRotateLeft, faStopwatch, faWeight
} from "@fortawesome/free-solid-svg-icons";
import {ButtonComponent} from "../../shared/button/button.component";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {ActivatedRoute, RouterLink, Router} from "@angular/router";
import {ExerciseProgressBarComponent} from "../../shared/exercise-progress-bar/exercise-progress-bar.component";
import {Exercise} from "../../models/exercise.model";
import {ExerciseRepsAndSets} from "../../models/exercise-reps-and-sets.model";
import {faForwardStep} from "@fortawesome/free-solid-svg-icons/faForwardStep";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {ExerciseComponent} from "../../shared/exercise/exercise.component";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {FormatTimePipe} from "../../shared/pipes/format-time.pipe";
import {TimerComponent} from "../../shared/timer/timer.component";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {NumberSelectorComponent} from "../../shared/number-selector/number-selector.component";
import {TimeEditorComponent} from "../../shared/time-editor/time-editor.component";
import {NumberEditorComponent} from "../../shared/number-editor/number-editor.component";
import {ExerciseExecutionModel} from "../../models/exercise-execution.model";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-exercise-start',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FaIconComponent,
    ButtonComponent,
    NgIf,
    RouterLink,
    ExerciseProgressBarComponent,
    ExerciseComponent,
    FormatTimePipe,
    TimerComponent,
    NumberSelectorComponent,
    TimeEditorComponent,
    NumberEditorComponent,
  ],
  templateUrl: './exercise-start.component.html',
  styleUrl: './exercise-start.component.css'
})
export class ExerciseStartComponent implements OnInit {

  exercise: ExerciseRepsAndSets | null = null; // Updated to be fetched dynamically
  isShowingTimers: boolean = false;
  exerciseTimerState: 'stopped' | 'paused' | 'playing' | 'reset' = 'paused';
  breakTimerState: 'stopped' | 'paused' | 'playing' | 'reset' = 'stopped';
  initialTime: number = -5000;

  exerciseTimer: number = 0;
  finalExerciseTime: number = 0;
  breakTimer: number = 0;
  finalBreakTime: number = 0;
  currentRepetitions: number = 0;
  currentWeight: number = 0;

  isExerciseExecutionValid: boolean = false;
  nextExerciseName: string = "-----"; // Default value if no next exercise

  exerciseExecution: Array<ExerciseExecutionModel | null> = [];

  protected readonly faPencil = faPencil;
  protected readonly faForwardStep = faForwardStep;
  protected readonly faBackwardStep = faBackwardStep;
  protected readonly faPlay = faPlay;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faBars = faBars;
  protected readonly faStop = faStop;
  protected readonly faPause = faPause;
  protected readonly faRotateLeft = faRotateLeft;
  protected readonly faCancel = faCancel;
  protected readonly faStopwatch = faStopwatch;
  protected readonly faRepeat = faRepeat;
  protected readonly faDumbbell = faDumbbell;
  protected readonly faWeight = faWeight;
  protected readonly faCheck = faCheck;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    // Listen to route parameter changes
    this.route.params.subscribe(() => {
      this.updateExerciseData();
    });
  }
  
  updateExerciseData(): void {
    // Fetch the chartId and exerciseId from the URL
    const chartId = this.route.snapshot.url[2]?.path;
    console.log('chartId from URL:', chartId);
  
    const exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'));
    console.log('exerciseId from URL:', exerciseId);
  
    // Fetch chart data from localStorage
    if (chartId) {
      const rawChartData = localStorage.getItem('charts') || '[]';
      console.log('Raw chart data from localStorage:', rawChartData);
  
      const chartData = JSON.parse(rawChartData);
      console.log('Parsed chart data:', chartData);
  
      const chart = chartData.find((c: any) => c.id === chartId);
      console.log('Matched chart for chartId:', chart);
  
      if (chart) {
        this.exercise = chart.exercises.find((e: any) => e.id === exerciseId) || null;
        console.log('Matched exercise for exerciseId:', this.exercise);
  
        // Determine the next exercise
        const currentIndex = chart.exercises.findIndex((e: any) => e.id === exerciseId);
        const nextExercise = chart.exercises[currentIndex + 1];
        this.nextExerciseName = nextExercise ? nextExercise.name : '-----';
        console.log('Next exercise name:', this.nextExerciseName);
      } else {
        console.warn('No chart found for the given chartId:', chartId);
      }
    } else {
      console.warn('chartId is null or undefined in the URL');
    }
  
    // Initialize the exercise execution array based on the series count of the exercise
    if (this.exercise) {
      console.log('Initializing exerciseExecution for exercise:', this.exercise);
      this.exerciseExecution = Array.from({ length: this.exercise.series }, () => null);
      console.log('Initialized exerciseExecution array:', this.exerciseExecution);
    } else {
      console.warn('No exercise found; exerciseExecution will not be initialized.');
    }
  }

  nextExercise(): void {
    const chartId = this.route.snapshot.url[2]?.path;
    const exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'));
  
    const rawChartData = localStorage.getItem('charts') || '[]';
    const chartData = JSON.parse(rawChartData);
    const chart = chartData.find((c: any) => c.id === chartId);
  
    if (chart) {
      const currentIndex = chart.exercises.findIndex((e: any) => e.id === exerciseId);
      const nextExercise = chart.exercises[currentIndex + 1];
  
      if (nextExercise) {
        // Navigate to the next exercise
        this.router.navigate([`/training/exercise-start/${chartId}/${nextExercise.id}`]);
      } else {
        // No more exercises: end the training
        console.log('Training completed. No more exercises.');
        this.finalizeTrainingDay()
      }
    } else {
      console.warn('Chart not found for the given chartId:', chartId);
    }
  }
  

  previousExercise(): void {
    const chartId = this.route.snapshot.url[2]?.path;
    const exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'));

    const rawChartData = localStorage.getItem('charts') || '[]';
    const chartData = JSON.parse(rawChartData);
    const chart = chartData.find((c: any) => c.id === chartId);

    if (chart) {
      const currentIndex = chart.exercises.findIndex((e: any) => e.id === exerciseId);
      const previousExercise = chart.exercises[currentIndex - 1];
      if (previousExercise) {
        this.router.navigate([`/training/exercise-start/${chartId}/${previousExercise.id}`]);
      }
    }
  }
  
  getSafeUrl(url: string | undefined): SafeUrl {
  if (url) {
    // Remove everything after '&pp=' if present
    const cleanedUrl = url.split('&pp=')[0];
    // Convert to YouTube embed format
    const youtubeEmbedUrl = cleanedUrl.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
  }
  return ''; // Return empty if no URL is provided
}
  

  playTimer(): void {
    this.exerciseTimerState = 'playing';
  }

  stopTimer(): void {
    this.finalExerciseTime = this.exerciseTimer;
    console.log(this.exerciseTimer);
    this.exerciseTimerState = 'stopped';
    this.breakTimerState = 'playing';
  }

  resetTimer(): void {
    this.exerciseTimerState = 'reset';
  }

  cancelTimer(): void {
    this.resetTimer();
    this.isShowingTimers = false;
  }

  pauseTimer(): void {
    this.exerciseTimerState = 'paused';
  }

  onExerciseTimerValueChange(currentValue: number): void {
    this.exerciseTimer = currentValue;
  }

  onBreakTimerValueChange(currentValue: number): void {
    this.breakTimer = currentValue;
  }

  startExercise(): void {
    this.isShowingTimers = true;
  }

  isShowingBreakTimer(): boolean {
    return this.exerciseTimerState === 'stopped' && this.exerciseTimer > 0;
  }

  repetitionOutput(repetitions: number): void {
    this.currentRepetitions = repetitions;
    this.isExerciseExecutionValid = this.currentRepetitions > 0 && this.currentWeight > 0;
  }

  weightOutput(weight: number): void {
    this.currentWeight = weight;
    this.isExerciseExecutionValid = this.currentRepetitions > 0 && this.currentWeight > 0;
  }

  finalizeSeries(): void {
    this.finalBreakTime = this.breakTimer;
  
    const currentExecution: ExerciseExecutionModel = {
      exerciseId: this.exercise?.id || 0,
      exerciseTime: this.finalExerciseTime,
      breakTime: this.finalBreakTime,
      repetitions: this.currentRepetitions,
      weight: this.currentWeight,
    };
  
    const emptyIndex = this.exerciseExecution.findIndex(item => item === null);
    if (emptyIndex !== -1) {
      const updatedExecution = [...this.exerciseExecution];
      updatedExecution[emptyIndex] = currentExecution;
      this.exerciseExecution = updatedExecution;
    }
  
    console.log('exercise execution: ', this.exerciseExecution);
    this.resetTimer();
    this.isShowingTimers = false;
  }

  finalizeTrainingDay(): void {
    console.log('Finalize Training Day called');
    // Capture the current date and time in ISO format
    const currentDateTime = new Date().toISOString();
  
    // Create the object that will be saved to localStorage
    const trainingDayData = {
      date: currentDateTime,
      exerciseData: [...this.exerciseExecution],  // Save the entire array of exercise executions
    };
  
    // Get the current training days saved in localStorage
    const rawTrainingData = localStorage.getItem('trainingDaysData') || '[]';
    const trainingDaysData = JSON.parse(rawTrainingData);
  
    // Add the current training day data to the list
    trainingDaysData.push(trainingDayData);
  
    // Save the updated array of training days to localStorage
    localStorage.setItem('trainingDaysData', JSON.stringify(trainingDaysData));
  
    // Optionally, show a success message
    this.toastService.showSuccess('Treino finalizado, informações salvas.');
  
    // You can navigate to another page, if necessary
    this.router.navigate(['/training/training-day-select']);  // Replace with your desired route
  }
  
}
