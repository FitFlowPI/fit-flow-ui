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
import {RouterLink} from "@angular/router";
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

  //TODO: esse exercício tem que ser puxado do banco
  exercise: ExerciseRepsAndSets = {id: 1, series: 4, name: 'Supino inclinado', repetitions: 12};
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


  exerciseExecution: Array<ExerciseExecutionModel | null> = [];

  ngOnInit() {
    this.exerciseExecution = Array.from({ length: this.exercise.series }, () => null);
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

  pauseTimer() {
    this.exerciseTimerState = 'paused';
  }

  onExerciseTimerValueChange(currentValue: number): void {
    this.exerciseTimer = currentValue;
    // console.log(currentValue);
  }

  onBreakTimerValueChange(currentValue: number): void {
    this.breakTimer = currentValue;
  }

  startExercise() {
    this.isShowingTimers = true;
  }

  isShowingBreakTimer(): boolean {
    return this.exerciseTimerState === 'stopped' && this.exerciseTimer > 0;
  }

  repetitionOutput(repetitions: number) {
    this.currentRepetitions = repetitions;
    this.isExerciseExecutionValid = this.currentRepetitions > 0 && this.currentWeight > 0;
  }

  weightOutput(weight: number) {
    this.currentWeight = weight;
    this.isExerciseExecutionValid = this.currentRepetitions > 0 && this.currentWeight > 0;
  }

  finalizeSeries() {
    this.finalBreakTime = this.breakTimer;
    const currentExecution: ExerciseExecutionModel =
      {
        exerciseTime: this.finalExerciseTime,
        breakTime: this.finalBreakTime,
        repetitions: this.currentRepetitions,
        weight: this.currentWeight
      }
    const emptyIndex = this.exerciseExecution.findIndex(item => item === null);
    if (emptyIndex !== -1) {
      const updatedExecution = [...this.exerciseExecution];
      updatedExecution[emptyIndex] = currentExecution;
      this.exerciseExecution = updatedExecution; // Replace the array reference
    }


    console.log('exercise execution: ', this.exerciseExecution);
    this.resetTimer();
    this.isShowingTimers = false;
  }

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
}
